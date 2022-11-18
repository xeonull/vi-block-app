<template>
  <v-dialog v-model:show="isDialogVisible">
    <div class="coin__list">
      <div v-if="isSearchDataLoading">Search...</div>
      <div v-else-if="coinsFound.length > 0">
        <div><h3>Search result:</h3></div>
        <div v-for="coin in coinsFound" :key="coin.id">
          <v-button @click="addCoin(coin)" :key="coin.id">+</v-button>
          <span>&nbsp;{{ coin.symbol }} ({{ coin.name }})</span>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, inject, Ref, ref, watch } from "vue";

import { IMessage } from "@//types/Service.interface";
import { IState } from "@/types/State.interface";

import { useMarket } from "@/hooks/useMarket";
import { useStore } from "vuex";
const store = useStore();
const state: IState = store.state;

const props = defineProps<{
  searchCoin: string;
}>();

const toast = inject("toast") as Ref<IMessage>;

const { coinsFound, loadSearchCoins, addCoin } = useMarket(toast);
const isSearchDataLoading = computed((): boolean => state.market.isLoading);

watch(
  () => props.searchCoin,
  async (newText) => {
    openDialog();
    await loadSearchCoins(newText);
  }
);

const isDialogVisible = ref(false);
const openDialog = () => (isDialogVisible.value = true);
</script>

<style scoped>
.coin__list {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
</style>
