<template>
  <v-toast ref="toast" />
  <!-- <v-dialog v-model:show="dialogVisible">
    <h2>{{ errorSearchMessage }}</h2>
  </v-dialog> -->
  <VHeader @on-search="onSearch" />
  <div class="area__main">
    <BlockchainStatus />
    <v-button :isDisabled="isBlockLoading" @click="loadNextBlock" class="btn__nexIBlock"> load {{ blocks.length ? "previous" : "last" }} block </v-button>
    <BlockList :blocks="blocks" />
  </div>
</template>

<script lang="ts" setup>
import VHeader from "@/components/VHeader.vue";
import BlockchainStatus from "@/components/BlockchainStatus.vue";
import BlockList from "@/components/BlockList.vue";
import { IState } from "./types/State.interface";
import { IBlock } from "./types/Blocks.interface";
import { IToast } from "./types/Service.interface";

import { computed } from "@vue/reactivity";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";

const toast = ref<IToast | null>(null);

const store = useStore();
const state: IState = store.state;

const blocks = computed((): IBlock[] => state.block.blocks);
const isBlockLoading = computed((): boolean => state.block.isBlockLoading);

const loadNextBlock = (): void => {
  store
    .dispatch("block/fetchNextBlock")
    .then()
    .catch((error) => {
      toast.value?.show(String(error));
    });
};
const onSearch = (text: string): void => {
  store
    .dispatch("block/fetchSearchBlock", text)
    .then()
    .catch((error) => {
      toast.value?.show(String(error));
    });
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

html,
body {
  margin: 0;
  padding: 0;
}

.btn__nexIBlock {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 15px;
}

h1 {
  margin: 5px 0px;
  font-size: 3ch;
}

h2 {
  margin: 5px 0px;
  font-size: 2.5ch;
}

.area__main {
  margin: 15px;
}

.block {
  margin-top: 5px;
  border: 1px solid rgba(0, 0, 0);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  box-sizing: border-box;
  padding: 10px 10px;
  background: #fff;
}
</style>
