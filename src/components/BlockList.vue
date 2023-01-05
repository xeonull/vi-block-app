<template>
  <div class="block__list">
    <div v-if="blocks.length > 0">
      <div><h3>Block List:</h3></div>
      <TransitionGroup name="list">
        <BlockItem v-for="block in blocks" :block="block" :key="block.hash" />
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BlockItem from "@/components/BlockItem.vue";
import { IBlock } from "@/types/Block.interface.js";

// eslint-disable-next-line
const props = defineProps<{
  blocks: IBlock[];
}>();
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.block__list {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
</style>
