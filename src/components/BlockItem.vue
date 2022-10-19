<template>
  <div class="block">
    <router-link :to="{ name: 'block', params: { id: block.height } }">
      <h2 class="block__title">Block #{{ block.height }}</h2>
    </router-link>
    <div class="block__hash"><b>Hash:</b> <span v-hashcode="block.hash" :title="block.hash" /></div>
    <div class="block__total"><b>Total:</b> {{ block.total / 10 ** 8 }} BTC</div>
    <div class="block__nonce"><b>Nonce:</b> {{ block.nonce }}</div>
    <div class="block__n_tx"><b>Number of transactions:</b> {{ block.n_tx }}</div>
    <div class="block__time"><b>Received time:</b> <span v-datetimeformat="block.received_time" /></div>
    <div class="block__txs">
      <b>Transactions (max {{ block.txids.length }}): </b>
      <v-button @click="onExpandCollapse">{{ !isTXExpanded ? "+" : "-" }}</v-button>
    </div>
    <div class="block__txs__list" v-if="isTXExpanded">
      <div v-for="tx in block.txids" :key="tx">{{ tx }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IBlock } from "@/types/Blocks.interface";

import { ref } from "@vue/reactivity";

const props = defineProps<{
  block: IBlock;
}>();

const isTXExpanded = ref(false);
const onExpandCollapse = (): void => {
  isTXExpanded.value = !isTXExpanded.value;
};
</script>

<style lang="scss" scoped>
.block__txs__list {
  margin-left: 20px;
}
</style>
