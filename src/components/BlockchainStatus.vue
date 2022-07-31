<template>
  <div v-if="isBlockchainStatusLoading">Идет загрузка...</div>
  <div v-else class="block">
    <h1>Blockchain Status</h1>
    <div><b>Name:</b> {{ blockchainStatus?.name }}</div>
    <div><b>The number of blocks in the blockchain:</b> {{ blockchainStatus?.height }}</div>
    <div><b>Hash:</b> {{ blockchainStatus?.hash }}</div>
    <div><b>Number of unconfirmed transactions in memory pool:</b> {{ blockchainStatus?.unconfirmed_count }}</div>
  </div>
</template>

<script lang="ts">
import { IStatus } from "@/types/Blocks.interface";
import { IState } from "@/types/State.interface";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "blockchain-status",
  methods: {
    ...mapActions({
      loadStatus: "status/fetchBlockchainStatus",
    }),
  },

  computed: {
    //...mapState("status", ["blockchainStatus", "isBlockchainStatusLoading"]),
    ...mapState({
      blockchainStatus: (state): IStatus | null => (state as IState).status.blockchainStatus,
      isBlockchainStatusLoading: (state): boolean => (state as IState).status.isBlockchainStatusLoading,
    }),
  },

  beforeMount() {
    this.loadStatus();
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
</style>
