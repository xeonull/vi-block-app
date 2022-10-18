<template>
  <div class="block">
    <router-link :to="{ name: 'block', params: { id: block.height } }">
      <h2 class="block__title">Block #{{ block.height }}</h2>
    </router-link>
    <div class="block__hash"><b>Hash:</b> {{ block.hash }}</div>
    <div class="block__total"><b>Total:</b> {{ block.total / 10 ** 8 }} BTC</div>
    <div class="block__nonce"><b>Nonce:</b> {{ block.nonce }}</div>
    <div class="block__n_tx"><b>Number of transactions:</b> {{ block.n_tx }}</div>
    <div class="block__time"><b>Received time:</b> {{ datetime_localized }}</div>
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

import { computed, ComputedRef, ref } from "@vue/reactivity";
//import { computed, ComputedRef, ref } from "vue";

const props = defineProps<{
  block: IBlock;
}>();

const isTXExpanded = ref(false);
const onExpandCollapse = (): void => {
  isTXExpanded.value = !isTXExpanded.value;
};
const datetime_localized: ComputedRef<string> = computed((): string => new Date(props.block.received_time).toLocaleString());
</script>

<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
} */
a {
  color: #42b983;
}
.block__txs__list {
  margin-left: 20px;
}
</style>
