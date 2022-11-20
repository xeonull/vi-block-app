<template>
  <div class="coin__list">
    <div v-if="coins.length > 0">
      <div><h3>Your coin list:</h3></div>
      <div class="tool">
        <div class="tool__btn"><v-button @click="updateMarketData">Update</v-button></div>
        <div class="tool__btn"><v-button @click="removeCoinFromTable(seletedCoin)" :isDisabled="!seletedCoin">Remove</v-button></div>
      </div>
      <table id="coins">
        <tr>
          <th class="header__img"></th>
          <th>Symbol</th>
          <th>Name</th>
          <th>Rank</th>
          <th>Price</th>
          <th>Market Cap</th>
        </tr>
        <tr v-for="coin in coins" :key="coin.id" @click="selectRow(coin)" :class="{ selected: coin == seletedCoin }">
          <td tabindex="0" class="column__img"><img :src="coin.thumb" /></td>
          <td tabindex="1" class="column__symbol">{{ coin.symbol }}</td>
          <td tabindex="2">{{ coin.name }}</td>
          <td>{{ coin.market_cap_rank }}</td>
          <td><span v-currencyformat="{ value: coin.current_price, currency }" /></td>
          <td><span v-currencyformat="{ value: coin.market_cap, currency }" /></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onBeforeMount, inject, ref } from "vue";

import { IMessage } from "@//types/Service.interface";
import { useMarket } from "@/hooks/useMarket";
import { ICoin } from "@/types/Market.interface";

const toast = inject("toast") as Ref<IMessage>;

const { coins, currency, loadCoins, updateMarketData, removeCoin } = useMarket(toast);

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

#coins .selected {
  background-color: var(--color-background-control-checked);
}

#coins th {
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: left;
  background-color: $color_primary_dark;
  color: $color_background;
  &.header__img {
    // background-color: var(--color-background);
    width: 25px;
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
