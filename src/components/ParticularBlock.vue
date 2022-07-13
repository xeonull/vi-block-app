<template>
  <div class="main">
    <h2>Block #{{ block.height }}</h2>
    <div><b>Hash:</b> {{ block.hash }}</div>
    <div><b>Total:</b> {{ block.total / 10 ** 8 }}</div>
    <div><b>Nonce:</b> {{ block.nonce }}</div>
    <div><b>Number of transactions:</b> {{ block.n_tx }}</div>
    <div><b>Received time:</b> {{ block.received_time }}</div>
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
import { TBlock } from "./../types/blocks";

export default defineComponent({
  name: "particular-block",
  props: {
    block: {
      type: Object as PropType<TBlock>,
      required: true,
    },
  },
  data() {
    return {
      isTXExpanded: false,
    };
  },

  methods: {
    onExpandCollapse() {
      this.isTXExpanded = !this.isTXExpanded;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
