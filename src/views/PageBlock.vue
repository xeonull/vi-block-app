<template>
  <div v-if="block" class="area__block">
    <div class="list">
      <h2 class="block__title">Block #{{ block.height }}</h2>
      <div class="block__field"><b>Hash:</b> {{ block.hash }}</div>
      <div class="block__field"><b>Chain:</b> {{ block.chain }}</div>
      <div class="block__field"><b>Total:</b> {{ block.total / 10 ** 8 }} BTC</div>
      <div class="block__field"><b>Fees:</b> {{ block.fees / 10 ** 8 }} BTC</div>
      <div class="block__n_tx"><b>Number of transactions:</b> {{ block.n_tx }}</div>
      <div class="block__field"><b>Received time:</b> <span v-datetimeformat="block.received_time" /></div>
      <div class="block__field"><b>Nonce:</b> {{ block.nonce }}</div>
      <div class="block__field"><b>Size:</b> {{ block.size }} bytes</div>
      <div class="block__field"><b>VSize:</b> {{ block.vsize }} bytes</div>
      <div class="block__field"><b>Relayed by:</b> {{ block.relayed_by }}</div>
      <div class="block__field"><b>Bits:</b> {{ block.bits }}</div>
      <div class="block__field"><b>Version:</b> {{ block.ver }}</div>
      <div class="block__field"><b>Merkle root:</b> {{ block.mrkl_root }}</div>
      <!-- <div class="block__field"><b>Coinbase data:</b> {{ block.coinbase_addr }}</div> -->
      <!-- <div class="block__field"><b>Depth:</b> {{ block.depth }}</div> -->
      <!-- <div class="block__field"><b>tx_url:</b> {{ block.tx_url }}</div>
      <div class="block__field"><b>next_txids:</b> {{ block.next_txids }}</div> -->
    </div>
    <div class="list">
      <div class="block__txs">
        <b>Transactions (max {{ block.txids.length }}): </b>
      </div>
      <div class="block__txs__list">
        <div v-for="tx in block.txids" :key="tx">{{ tx }}</div>
      </div>
    </div>
  </div>
  <div v-else><span class="span__not_found">Block not found</span></div>
</template>

<script lang="ts" setup>
import { IBlock } from "@/types/Block.interface";
import { IMessage } from "@//types/Service.interface";

import { useRoute, useRouter } from "vue-router";
import { useBlock } from "@/hooks/useBlock";

import { inject, ref, watch, Ref } from "vue";

const props = defineProps<{
  searchText: string;
}>();

const toast = inject("toast") as Ref<IMessage>;
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
  max-width: 750px;
}

.block__txs__list {
  margin-left: 20px;
}

.btn__nextBlock {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 15px;
  max-width: 10rem;
}
.list {
  margin: 10px;
  border-radius: 0.25rem;
  background-color: var(--color-background-block);
  padding: 25px;
  display: inline-block;
  word-break: break-word;
  & div {
    margin: 10px;
  }
}
</style>
