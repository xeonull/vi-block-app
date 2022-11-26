<template>
  <div class="coin__list">
    <div v-if="coins.length > 0">
      <VNav :activeLink="activeNavLink" :links="arrayNavLink" @update:selectedLink="updateActiveNavLink" />
      <div class="tool">
        <div class="tool__btn"><v-button @click="updateMarketData">Update</v-button></div>
        <div class="tool__btn" v-if="isEditable">
          <v-button @click="removeCoinFromTable(seletedCoin)" :isDisabled="!seletedCoin">Remove</v-button>
        </div>
      </div>
      <table id="coins">
        <tr :onclick="onClickLink">
          <th class="header__img"></th>
          <th><a href="#" class="sort-by" id="symbol">Symbol</a></th>
          <th><a href="#" class="sort-by" id="name">Name</a></th>
          <th><a href="#" class="sort-by" id="market_cap_rank">Rank</a></th>
          <th><a href="#" class="sort-by" id="current_price">Price</a></th>
          <th><a href="#" class="sort-by" id="market_cap">Market Cap</a></th>
        </tr>
        <tr v-for="coin in coins" :key="coin.id" @click="selectRow(coin)" :class="{ selected: coin == seletedCoin }">
          <td class="column__img"><img :src="coin.thumb" /></td>
          <td class="column__symbol">{{ coin.symbol }}</td>
          <td>{{ coin.name }}</td>
          <td>{{ coin.market_cap_rank }}</td>
          <td><span v-currencyformat="{ value: coin.current_price, currency }" /></td>
          <td><span v-currencyformat="{ value: coin.market_cap, currency }" /></td>
        </tr>
      </table>
    </div>
    <div v-else class="div__empty">
      <h3>To add coins to the list, use the search field</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VNav from "@/components/ui/VNav.vue";

import { Ref, onBeforeMount, inject, ref, onMounted } from "vue";

import { IMessage } from "@//types/Service.interface";
import { useMarket } from "@/hooks/useMarket";
import { ICoin } from "@/types/Market.interface";

const toast = inject("toast") as Ref<IMessage>;

const { coins, currency, loadCoins, updateMarketData, removeCoin, sortCoins, activeNavLink, arrayNavLink, updateActiveNavLink, isEditable } = useMarket(toast);

onBeforeMount(() => {
  loadCoins();
  updateMarketData();
});

const seletedCoin: Ref<ICoin | null> = ref(null);

const selectRow = (coin: ICoin) => {
  seletedCoin.value = coin;
};

const removeCoinFromTable = (coin: ICoin | null) => {
  coin && removeCoin(coin);
  seletedCoin.value = null;
};

onMounted(() => {
  // Deselecting table row if there was a click outside the table area
  const htmlTableCoin: HTMLTableElement | null = document.querySelector("#coins");
  const onClickOutside = (e: Event) => {
    if (htmlTableCoin && !htmlTableCoin.contains(e.target as HTMLElement)) {
      seletedCoin.value = null;
    }
  };
  document.addEventListener("click", onClickOutside);
});

let asc = false;
const onClickLink = (e: Event) => {
  const field = (e.target as HTMLElement).id;
  if (field) {
    sortCoins(field, asc);
    asc = !asc;
  }
};
</script>

<style lang="scss" scoped>
.coin__list {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  width: 100%;
}
.tool {
  display: flex;
  flex-direction: row;
}
.tool__btn {
  margin: 10px 8px 10px 2px;
}
#coins {
  border-collapse: collapse;
  width: 100%;
}
#coins td,
#coins th {
  border: 2px solid var(--color-background);
  padding: 4px;
  a {
    display: block;
  }
}
#coins tr {
  background-color: var(--color-background-highlight);
}
// #coins tr:nth-child(even) {
//   background-color: var();
// }
#coins tr:hover {
  background-color: var(--color-background-control);
}
#coins tr.selected {
  background-color: $color_primary_light;
  color: $color_text;
}

#coins th {
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: left;
  color: $color_background;
  background-color: $color_primary;
  &.header__img {
    // background-color: var(--color-background);
    width: 25px;
  }
  a:link,
  a:visited,
  a:hover,
  a:active {
    color: $color_background;
    text-decoration: none;
  }
  a.sort-by {
    padding-right: 18px;
    position: relative;
  }
  a.sort-by:before,
  a.sort-by:after {
    border: 4px solid transparent;
    content: "";
    display: block;
    height: 0;
    right: 5px;
    position: absolute;
    width: 0;
    top: 50%;
  }
  a.sort-by:before {
    border-bottom-color: $color_background;
    margin-top: -10px;
  }
  a.sort-by:after {
    border-top-color: $color_background;
    margin-top: 2px;
  }
}
.column__symbol {
  text-transform: uppercase;
}
// .column__img {
//   background-color: var(--color-background);
// }
img {
  vertical-align: middle;
}
</style>
