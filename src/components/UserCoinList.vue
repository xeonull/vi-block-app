<template>
  <div class="coin__list">
    <div v-if="coins.length > 0">
      <div><h3>Your coin list:</h3></div>
      <table id="coins">
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Price</th>
          <th>Market Cap</th>
        </tr>
        <tr v-for="coin in coins" :key="coin.id">
          <td>{{ coin.symbol }}</td>
          <td>{{ coin.name }}</td>
          <td>{{ coin.market ? coin.market[0].price : "---" }}</td>
          <td>{{ coin.market ? coin.market[0].market_cap : "---" }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { IToast } from "@//types/Service.interface";
import { useMarket } from "@/hooks/useMarket";

const toast = ref<IToast | null>(null);

const { coins } = useMarket(toast);
</script>

<style lang="scss" scoped>
.coin__list {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 75%;
}

#coins {
  border-collapse: collapse;
  width: 100%;
}
#coins td,
#coins th {
  border: 1px solid var(--color-text);
  padding: 4px;
}
// #coins tr:nth-child(even) {
//   background-color: var();
// }
#coins tr:hover {
  background-color: var(--color-background-control);
}
#coins th {
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: left;
  background-color: var(--color-background-control-checked);
  color: var(--color-text);
}
</style>
