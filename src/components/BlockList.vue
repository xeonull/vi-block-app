<template>
  <div class="block__list">
    <div v-if="blocks.length > 0">
      <div><h3>Block List:</h3></div>
      <BlockItem v-for="block in blocks" :block="block" :key="block.hash" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BlockItem from "@/components/BlockItem.vue";
import { IBlock } from "@/types/Blocks.interface";

export default defineComponent({
  name: "block-list",
  components: {
    BlockItem,
  },
  props: {
    blocks: {
      type: Array as PropType<Array<IBlock>>,
      required: true,
    },
  },
});
</script>

<style scoped>
.block__list {
  margin-left: 20px;
}
</style>
