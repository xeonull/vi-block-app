<template>
  <def-dialog v-model:show="dialogVisible">
    <h2>{{ errorSearchMessage }}</h2>
  </def-dialog>
  <Header @on-search="onSearch" />
  <div class="area__main">
    <BlockchainStatus v-if="isBlockchainStateLoaded" :status="blockchainStatus" />
    <div v-else>Идет загрузка...</div>
    <def-button :isDisabled="isNextBlockLoading" @click="onNextBlock" class="btn__nexIBlock"> load {{ blocks.length ? "previous" : "last" }} block </def-button>
    <BlockList :blocks="blocks" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import BlockchainStatus from "@/components/BlockchainStatus.vue";
import BlockList from "@/components/BlockList.vue";
import { mapActions, mapState } from "vuex";
import store from "./store";

export default defineComponent({
  name: "App",
  components: {
    Header,
    BlockchainStatus,
    BlockList,
  },
  data() {
    return {
      dialogVisible: false as boolean,
      errorSearchMessage: "" as string,
    };
  },

  methods: {
    ...mapActions({
      onNextBlock: "block/fetchNextBlock",
      onStatus: "status/fetchBlockchainStatus",
    }),

    async onSearch(text: string): Promise<void> {
      try {
        store.dispatch("block/fetchSearchBlock", text);
      } catch (error: unknown) {
        this.errorSearchMessage = String(error);
        this.dialogVisible = true;
      }
    },
  },

  computed: {
    ...mapState("block", ["blocks", "isNextBlockLoading"]),
    ...mapState("status", ["blockchainStatus", "isBlockchainStateLoaded"]),
  },

  async mounted() {
    this.onStatus();
  },
});
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
