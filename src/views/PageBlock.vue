<template>
  <v-toast ref="toast" />

  <div class="area__block">
    <BlockchainStatus />
    <v-button :isDisabled="isBlockLoading" @click="loadNextBlock" class="btn__nextBlock"> load {{ blocks.length ? "previous" : "last" }} block </v-button>
    <BlockList :blocks="blocks" />
  </div>
</template>

<script lang="ts" setup>
import BlockchainStatus from "@/components/BlockchainStatus.vue";
import BlockList from "@/components/BlockList.vue";
import { IState } from "@/types/State.interface";
import { IBlock } from "@/types/Blocks.interface";
import { IToast } from "@//types/Service.interface";

import { watch, computed, ref } from "vue";
import { useStore } from "vuex";

const toast = ref<IToast | null>(null);

const props = defineProps<{
  searchText: string;
}>();

const store = useStore();
const state: IState = store.state;

const blocks = computed((): IBlock[] => state.block.blocks);
const isBlockLoading = computed((): boolean => state.block.isBlockLoading);

const loadNextBlock = (): void => {
  store
    .dispatch("block/fetchNextBlock")
    .then()
    .catch((error) => {
      toast.value?.show(String(error));
    });
};

watch(
  () => props.searchText,
  async (newText) => {
    store
      .dispatch("block/fetchSearchBlock", newText)
      .then()
      .catch((error) => {
        toast.value?.show(String(error));
      });
  }
);
</script>

<style lang="scss" scoped>
.area__block {
  display: flex;
  flex-direction: column;
}

.btn__nextBlock {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 15px;
  max-width: 10rem;
}
</style>
