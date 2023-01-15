<template>
  <Teleport to=".search">
    <div class="box" v-if="isBoxVisible">
      <div class="box__inner">
        <div v-if="isSearching">
          <h3>Search...</h3>
          <table id="table__result"></table>
        </div>
        <div v-else-if="coinsFound.length > 0">
          <div><h3>Search result:</h3></div>
          <table id="table__result">
            <tr v-for="coin in coinsFound" :key="coin.id" @click="addCoin(coin)" title="add to list">
              <td class="coin__symbol">{{ coin.symbol }}</td>
              <td class="coin__name">{{ coin.name }}</td>
            </tr>
          </table>
          <div><h3></h3></div>
        </div>
        <div v-else class="box__text">
          <h3>No result found</h3>
          <table id="table__result"></table>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { inject, onMounted, onUnmounted, Ref, ref, watch } from "vue";

import { IMessage } from "@//types/Service.interface";

import { useMarket } from "@/hooks/useMarket";

const props = defineProps<{
  searchCoin: string;
}>();

const toast = inject("toast") as Ref<IMessage>;

const { coinsFound, isSearching, loadSearchCoins, addCoin } = useMarket(toast);

watch(
  () => props.searchCoin,
  async (newText) => {
    openDialog();
    await loadSearchCoins(newText);
  }
);

const isBoxVisible = ref(false);
const openDialog = () => (isBoxVisible.value = true);

/* global EventListener */
let onClickOutsideBox: EventListener;

onMounted(() => {
  // Deselecting table row if there was a click outside the search box area
  const htmlBox: HTMLTableElement | null = document.querySelector(".search");
  onClickOutsideBox = (e: Event) => {
    if (htmlBox && !htmlBox.contains(e.target as HTMLElement)) {
      isBoxVisible.value = false;
    }
  };
  document.addEventListener("click", onClickOutsideBox);
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutsideBox);
});
</script>

<style scoped lang="scss">
.box {
  pointer-events: none;
  display: flex;
  position: absolute;
  background: transparent;
  margin-top: $search_box_height;
  opacity: 95%;
  max-width: $search_box_width;
}
.box__inner {
  margin-right: $search_box_button_width + 2px;
  display: flex;
  flex-direction: column;
  pointer-events: all;
  max-width: $search_box_input_width;
  min-width: 186px;
  background: var(--color-background-block);
  position: relative;
}

h3 {
  padding: 0px 20px;
}

#table__result {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  tr {
    color: var(--color-text);
    &:hover {
      background-color: $color_primary_light;
      color: $color_text;
      cursor: pointer;
    }
  }
  td.coin__symbol {
    padding: 2px 20px;
    width: 30%;
    &:hover {
      color: $color_text;
    }
  }
}
</style>
