<template>
  <div class="area__wallet">Wallet page</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

const emit = defineEmits<{
  (e: "on-place", value: string): void;
}>();
onMounted(() => emit("on-place", "Input wallet address"));
</script>

<style lang="scss" scoped>
.area__wallet {
  display: flex;
  flex-direction: column;
}
</style>
