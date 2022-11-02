<template>
  <div class="block">
    <router-link :to="{ name: 'block', params: { id: block.height } }">
      <h2 class="block__title">Block #{{ block.height }}</h2>
    </router-link>
    <div class="block__hash"><b>Hash:</b> <span v-hashcode="block.hash" :title="block.hash" /></div>
    <div class="block__total"><b>Total:</b> {{ block.total / 10 ** 8 }} BTC</div>
    <div class="block__fees"><b>Fees:</b> {{ block.fees / 10 ** 8 }} BTC</div>
    <div class="block__n_tx"><b>Number of transactions:</b> {{ block.n_tx }}</div>
    <div class="block__time"><b>Received time:</b> <span v-datetimeformat="block.received_time" /></div>
  </div>
</template>

<script lang="ts" setup>
import { IBlock } from "@/types/Blocks.interface";

// eslint-disable-next-line
const props = defineProps<{
  block: IBlock;
}>();
</script>

<style lang="scss" scoped></style>
