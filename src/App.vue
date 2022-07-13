<template>
  <BlockchainState v-if="isBlockchainStateLoaded" :status="blockchainStatus" />
  <div v-else>Идет загрузка...</div>
  <def-button :disabled="isNextBlockLoading" @click="onNextBlock" class="btn__nextBlock">load next block</def-button>
  <div v-if="blocks.length > 0">
    <ParticularBlock v-for="block in blocks" :block="block" :key="block.hash" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BlockchainState from "./components/BlockchainState.vue";
import ParticularBlock from "./components/ParticularBlock.vue";
import { fetchMainBlock, fetchParticularBlock } from "./utils/web";
import { TStatus, TBlock } from "./types/blocks";

export default defineComponent({
  name: "App",
  components: {
    BlockchainState,
    ParticularBlock,
  },
  data() {
    return {
      blockchainStatus: {} as TStatus,
      blocks: [] as Array<TBlock>,
      isBlockchainStateLoaded: false,
      isNextBlockLoading: false,
    };
  },

  methods: {
    async onNextBlock() {
      this.isNextBlockLoading = true;
      try {
        const hash: string = this.blocks.length ? this.blocks[this.blocks.length - 1].prev_block : this.blockchainStatus.hash;
        const block: TBlock = await fetchParticularBlock(hash);
        this.blocks.push(block);
      } catch (error) {
        console.log("[[App Error - onNextBlock]]:", error);
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
  margin-top: 20px;
}

.btn__nextBlock {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 15px;
}
</style>
