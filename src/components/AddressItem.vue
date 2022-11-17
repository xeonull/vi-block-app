<template>
  <div class="block">
    <!-- <router-link :to="{ name: 'block', params: { id: block.height } }"> -->
    <h2 class="address__address">Address: {{ address.address }}</h2>
    <!-- </router-link> -->
    <div class="address__balance"><b>Balance:</b> {{ address.balance / 10 ** 8 }} BTC</div>
    <div class="address__fees"><b>Total received:</b> {{ address.total_received / 10 ** 8 }} BTC</div>
    <div class="address__fees"><b>Total sent:</b> {{ address.total_sent / 10 ** 8 }} BTC</div>
    <div class="address__n_tx"><b>Number of transactions:</b> {{ address.n_tx }}</div>
  </div>
</template>

<script lang="ts" setup>
import { IAddress } from "@/types/Address.interface";

// eslint-disable-next-line
const props = defineProps<{
  address: IAddress;
}>();
</script>

<style lang="scss" scoped></style>
