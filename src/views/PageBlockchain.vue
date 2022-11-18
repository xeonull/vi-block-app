<template>
  <div class="area__block">
    <BlockchainStatus />
    <v-button :isDisabled="isBlockLoading" @click="loadNextBlock" class="btn__nextBlock"> load {{ blocks.length ? "previous" : "last" }} block </v-button>
    <BlockList :blocks="blocks" />
  </div>
</template>

<script lang="ts" setup>
import { watch, Ref, inject } from "vue";

import BlockchainStatus from "@/components/BlockchainStatus.vue";
import BlockList from "@/components/BlockList.vue";
import { IMessage } from "@//types/Service.interface";
import { useBlock } from "@/hooks/useBlock";
import { usePlaceholder } from "@/hooks/usePlaceholder";

usePlaceholder("Input number or hash of block");

const props = defineProps<{
  searchText: string;
}>();

const toast = inject("toast") as Ref<IMessage>;
const { blocks, isBlockLoading, loadNextBlock, loadSearchBlock } = useBlock(toast);

watch(
  () => props.searchText,
  (newText) => loadSearchBlock(newText)
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
