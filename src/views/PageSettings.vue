<template>
  <div class="area__settings">
    <div class="row__setting">
      <p class="item">Use Dark Theme:</p>
      <v-toggle-switch v-model:checked="isDark" />
    </div>
    <div class="row__setting">
      <p class="item">Currency:</p>
      <v-select :current-value="currency" :list-of-values="currencyList" @update:current-value="updateCurrency" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDark } from "@vueuse/core";
import { ref } from "vue";

import { useMarket } from "@/hooks/useMarket";
import { usePlaceholder } from "@/hooks/usePlaceholder";
usePlaceholder("");

const { currency, currencyList, updateCurrency } = useMarket(ref(null));

const isDark = useDark();
</script>

<style lang="scss" scoped>
.area__settings {
  margin: 20px;
  display: flex;
  flex-direction: column;
}
.row__setting {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.item {
  padding: 0 10px;
  font-weight: bold;
}
</style>
