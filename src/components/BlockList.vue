<template>
  <div class="block__list">
    <div v-if="blocks.length > 0">
      <div><h3>Block List:</h3></div>
      <BlockItem v-for="block in blocks" :block="block" :key="block.hash" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BlockItem from "@/components/BlockItem.vue";
import { IBlock } from "@/types/Blocks.interface.js";

// eslint-disable-next-line
const props = defineProps<{
  blocks: IBlock[];
}>();
</script>

<style scoped>
.block__list {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
</style>
