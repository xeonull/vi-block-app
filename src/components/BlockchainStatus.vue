<template>
  <div v-if="isBlockchainStatusLoading">Loading...</div>
  <div v-else class="block">
    <h1>Blockchain Status</h1>
    <div class="block__name"><b>Name:</b> {{ blockchainStatus?.name }}</div>
    <div class="block__height"><b>The number of blocks in the blockchain:</b> {{ blockchainStatus?.height }}</div>
    <div class="block__hash"><b>Hash:</b> {{ blockchainStatus?.hash }}</div>
    <div class="block__ucount"><b>Number of unconfirmed transactions in memory pool:</b> {{ blockchainStatus?.unconfirmed_count }}</div>
  </div>
</template>

<script lang="ts" setup>
import { IStatus } from "@/types/Block.interface";
import { IState } from "@/types/State.interface";

import { Ref, toRef } from "@vue/reactivity";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

const store = useStore();
const state: IState = store.state;

const blockchainStatus: Ref<IStatus | null> = toRef(state.status, "blockchainStatus");
const isBlockchainStatusLoading: Ref<boolean> = toRef(state.status, "isLoading");

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
