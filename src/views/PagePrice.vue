<template>
  <div class="area__price">Price page</div>
</template>

<script lang="ts" setup>
import { usePlaceholder } from "@/hooks/usePlaceholder";
usePlaceholder("Input coin or token name");
</script>

<style lang="scss" scoped>
.area__price {
  display: flex;
  flex-direction: column;
}
</style>
