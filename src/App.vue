<template>
  <def-dialog v-model:show="dialogVisible">
    <h2>{{ errorSearchMessage }}</h2>
  </def-dialog>
  <Header @on-search="onSearch" />
  <div class="area__main">
    <BlockchainState v-if="isBlockchainStateLoaded" :status="blockchainStatus" />
    <div v-else>Идет загрузка...</div>
    <def-button :isDisabled="isNextBlockLoading" @click="onNextBlock" class="btn__nextBlock">load {{ blocks.length ? "previous" : "last" }} block</def-button>
    <div v-if="blocks.length > 0">
      <ParticularBlock v-for="block in blocks" :block="block" :key="block.hash" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import BlockchainState from "./components/BlockchainState.vue";
import ParticularBlock from "./components/ParticularBlock.vue";
import { fetchMainBlock, fetchBlockByCode } from "./utils/web";
import { TStatus, TBlock } from "./types/blocks";

export default defineComponent({
  name: "App",
  components: {
    Header,
    BlockchainState,
    ParticularBlock,
  },
  data() {
    return {
      blockchainStatus: {} as TStatus,
      blocks: [] as Array<TBlock>,
      isBlockchainStateLoaded: false as boolean,
      isNextBlockLoading: false as boolean,
      dialogVisible: false as boolean,
      errorSearchMessage: "" as string,
    };
  },

  methods: {
    async onNextBlock() {
      this.isNextBlockLoading = true;
      try {
        const hash: string = this.blocks.length ? this.blocks[this.blocks.length - 1].prev_block : this.blockchainStatus.hash;
        const block: TBlock = await fetchBlockByCode(hash);
        this.blocks.push(block);
      } catch (error) {
        console.log("[[App Error - onNextBlock]]:", error);
      } finally {
        this.isNextBlockLoading = false;
      }
    },

    async onSearch(text: string) {
      this.isNextBlockLoading = true;
      try {
        const block: TBlock = await fetchBlockByCode(text);
        this.blocks.push(block);
      } catch (error: any) {
        console.log("[[App Error - onSearch]]:", error);
        this.errorSearchMessage = error;
        this.dialogVisible = true;
      } finally {
        this.isNextBlockLoading = false;
      }
    },
  },

  async mounted() {
    try {
      this.blockchainStatus = await fetchMainBlock();
    } catch (error) {
      console.log("[[App Error - mounted]]:", error);
    } finally {
      this.isBlockchainStateLoaded = true;
    }
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

.btn__nextBlock {
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
