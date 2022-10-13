<template>
  <v-toast ref="toast" />
  <BlockchainStatus />
  <v-button :isDisabled="isBlockLoading" @click="loadNextBlock" class="btn__nexIBlock"> load {{ blocks.length ? "previous" : "last" }} block </v-button>
  <BlockList :blocks="blocks" />
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

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

.btn__nexIBlock {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 15px;
}

.block {
  margin-top: 5px;
  border: 1px solid rgba(0, 0, 0);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  box-sizing: border-box;
  padding: 10px 10px;
  background: $color_background_primary;
}
</style>
