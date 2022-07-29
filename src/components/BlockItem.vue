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
      <def-button @click="onExpandCollapse">{{ !isTXExpanded ? "+" : "-" }}</def-button>
    </div>
    <div class="txs" v-if="isTXExpanded">
      <div v-for="tx in block.txids" :key="tx">{{ tx }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IBlock } from "@/types/Blocks.interface";
import moment from "moment";

export default defineComponent({
  name: "block-item",
  props: {
    block: {
      type: Object as PropType<IBlock>,
      required: true,
    },
  },
  data() {
    return {
      isTXExpanded: false as boolean,
    };
  },
  methods: {
    onExpandCollapse(): void {
      this.isTXExpanded = !this.isTXExpanded;
    },
  },
  computed: {
    formatReceivedTime(): string {
      return moment(this.block.received_time).format("YYYY.MM.DD hh:mm:ss");
    },
  },
});
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
