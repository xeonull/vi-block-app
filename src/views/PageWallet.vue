<template>
  <div class="area__wallet">Wallet page</div>
</template>

<script lang="ts" setup>
import { usePlaceholder } from "@/hooks/usePlaceholder";
usePlaceholder("Input wallet address");
</script>

<style lang="scss" scoped>
.area__wallet {
  display: flex;
  flex-direction: column;
}
</style>
