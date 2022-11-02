<template>
  <div class="area__market">
    <UserCoinList />
    <FoundCoinList :searchCoin="searchText" />
  </div>
</template>

<script lang="ts" setup>
import FoundCoinList from "@/components/FoundCoinList.vue";
import UserCoinList from "@/components/UserCoinList.vue";

import { usePlaceholder } from "@/hooks/usePlaceholder";
usePlaceholder("Input coin or token name");

// eslint-disable-next-line
const props = defineProps<{
  searchText: string;
}>();
</script>

<style lang="scss" scoped>
.area__market {
  display: flex;
  flex-direction: row;
}
</style>
