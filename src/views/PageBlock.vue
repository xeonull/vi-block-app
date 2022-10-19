<template>
  <v-toast ref="toast" />
  <div v-if="block">
    <h2 class="block__title">Block #{{ block.height }}</h2>
    <div class="block__field"><b>Hash:</b> {{ block.hash }}</div>
    <div class="block__field"><b>Chain:</b> {{ block.chain }}</div>
    <div class="block__field"><b>Total:</b> {{ block.total / 10 ** 8 }} BTC</div>
    <div class="block__field"><b>Fees:</b> {{ block.fees / 10 ** 8 }} BTC</div>
    <div class="block__field"><b>Nonce:</b> {{ block.nonce }}</div>
    <div class="block__field"><b>Received time:</b> <span v-datetimeformat="block.received_time" /></div>
    <!-- <div class="block__field"><b>Received time:</b> {{ datetime_localized }}</div> -->
    <div class="block__field"><b>Size:</b> {{ block.size }} bytes</div>
    <div class="block__field"><b>VSize:</b> {{ block.vsize }} bytes</div>
    <div class="block__field"><b>Relayed by:</b> {{ block.relayed_by }}</div>
    <div class="block__field"><b>Bits:</b> {{ block.bits }}</div>
    <div class="block__field"><b>Merkle root:</b> {{ block.mrkl_root }}</div>
    <div class="block__field"><b>tx_url:</b> {{ block.tx_url }}</div>
    <div class="block__field"><b>next_txids:</b> {{ block.next_txids }}</div>
    <div class="block__n_tx"><b>Number of transactions:</b> {{ block.n_tx }}</div>
    <div class="block__txs">
      <b>Transactions (max {{ block.txids.length }}): </b>
      <!-- <v-button @click="onExpandCollapse">{{ !isTXExpanded ? "+" : "-" }}</v-button> -->
    </div>
    <!-- <div class="block__txs__list" v-if="isTXExpanded"> -->
    <div class="block__txs__list">
      <div v-for="tx in block.txids" :key="tx">{{ tx }}</div>
    </div>
  </div>
  <div v-else class="block">Block not found</div>
</template>

<script lang="ts" setup>
import { IBlock } from "@/types/Blocks.interface";
import { IToast } from "@//types/Service.interface";

import { useRoute, useRouter } from "vue-router";
import { useBlock } from "@/hooks/useBlock";

import { ref, watch } from "vue";

const props = defineProps<{
  searchText: string;
}>();
const toast = ref<IToast | null>(null);
const { blocks, loadSearchBlock } = useBlock(toast);

const route = useRoute();
const block = ref<IBlock>(blocks.find((b: IBlock) => b.height == Number(route.params.id)) as IBlock);

const router = useRouter();
watch(
  () => props.searchText,
  (newText) => {
    loadSearchBlock(newText)
      .then(() => {
        block.value = blocks[blocks.length - 1];
        router.push({ name: "block", params: { id: block.value.height } });
      })
      .catch();
  }
);
</script>

<style lang="scss" scoped>
.area__block {
  display: flex;
  flex-direction: column;
}

.btn__nextBlock {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 15px;
  max-width: 10rem;
}
</style>
