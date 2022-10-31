<template>
  <div class="area__price">Price page</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

const emit = defineEmits<{
  (e: "on-place", value: string): void;
}>();
onMounted(() => emit("on-place", "Input coin or token name"));
</script>

<style lang="scss" scoped>
.area__price {
  display: flex;
  flex-direction: column;
}
</style>
