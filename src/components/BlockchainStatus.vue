<template>
  <div v-if="isBlockchainStatusLoading">Loading...</div>
  <div v-else class="block">
    <h1>Blockchain Status</h1>
    <div><b>Name:</b> {{ blockchainStatus?.name }}</div>
    <div><b>The number of blocks in the blockchain:</b> {{ blockchainStatus?.height }}</div>
    <div><b>Hash:</b> {{ blockchainStatus?.hash }}</div>
    <div><b>Number of unconfirmed transactions in memory pool:</b> {{ blockchainStatus?.unconfirmed_count }}</div>
  </div>
</template>

<script lang="ts" setup>
import { IStatus } from "@/types/Blocks.interface";
import { IState } from "@/types/State.interface";

import { computed } from "@vue/reactivity";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

const store = useStore();
const state: IState = store.state;

const blockchainStatus = computed((): IStatus | null => state.status.blockchainStatus);
const isBlockchainStatusLoading = computed((): boolean => state.status.isBlockchainStatusLoading);

onBeforeMount(() => store.dispatch("status/fetchBlockchainStatus"));
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
</style>
