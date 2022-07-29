<template>
  <div class="block">
    <h1>Blockchain Status</h1>
    <div><b>Name:</b> {{ status.name }}</div>
    <div><b>The number of blocks in the blockchain:</b> {{ status.height }}</div>
    <div><b>Hash:</b> {{ status.hash }}</div>
    <div><b>Number of unconfirmed transactions in memory pool:</b> {{ status.unconfirmed_count }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IStatus } from "@/types/Blocks.interface";

export default defineComponent({
  name: "blockchain-status",
  props: {
    status: {
      type: Object as PropType<IStatus>,
      required: true,
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
</style>
