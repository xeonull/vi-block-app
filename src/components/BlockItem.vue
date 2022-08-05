<template>
  <div class="block">
    <h2>Block #{{ block.height }}</h2>
    <div><b>Hash:</b> {{ block.hash }}</div>
    <div><b>Total:</b> {{ block.total / 10 ** 8 }} BTC</div>
    <div><b>Nonce:</b> {{ block.nonce }}</div>
    <div><b>Number of transactions:</b> {{ block.n_tx }}</div>
    <div><b>Received time:</b> {{ formatReceivedTime }}</div>
    <div>
      <b>Transactions (max {{ block.txids.length }}): </b>
      <v-button @click="onExpandCollapse">{{ !isTXExpanded ? "+" : "-" }}</v-button>
    </div>
    <div class="txs" v-if="isTXExpanded">
      <div v-for="tx in block.txids" :key="tx">{{ tx }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IBlock } from "@/types/Blocks.interface";

import { computed } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";

const props = defineProps<{
  block: IBlock;
}>();

const isTXExpanded = ref(false);
const onExpandCollapse = (): void => {
  isTXExpanded.value = !isTXExpanded.value;
};
const formatReceivedTime = computed((): string => new Date(props.block.received_time).toLocaleString());
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.txs {
  margin-left: 20px;
}
</style>
