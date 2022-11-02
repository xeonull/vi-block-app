<template>
  <div class="coin__list">
    <div v-if="isSearchDataLoading">Loading...</div>
    <div v-else-if="coinsFound.length > 0">
      <div><h3>Search result:</h3></div>
      <div v-for="coin in coinsFound" :key="coin.id">
        <v-button @click="addCoin(coin)" :key="coin.id">+</v-button>
        <span>&nbsp;{{ coin.symbol }} ({{ coin.name }})</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";

import { IToast } from "@//types/Service.interface";
import { IState } from "@/types/State.interface";
import { ICoin } from "@/types/Market.interface";

import { useMarket } from "@/hooks/useMarket";
import { useStore } from "vuex";
const store = useStore();
const state: IState = store.state;

const props = defineProps<{
  searchCoin: string;
}>();

const toast = ref<IToast | null>(null);

const { coinsFound, loadSearchCoins } = useMarket(toast);
const isSearchDataLoading = computed((): boolean => state.market.isLoading);

watch(
  () => props.searchCoin,
  (newText) => loadSearchCoins(newText)
);

const addCoin = (coin: ICoin): void => {
  store.commit("market/addCoin", coin);
  console.log("[id]", coin.id);
  console.log("[length_c]", state.market.coins.length);
  console.log("[length_cf]", state.market.coins_found.length);
};
</script>

<style scoped>
.coin__list {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
</style>
