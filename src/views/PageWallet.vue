<template>
  <div class="area__wallet">
    <div v-if="addresses.length > 0">
      <AddressItem v-for="addr in addresses" :address="addr" :key="addr.address" />
    </div>
    <div v-else class="div__empty">
      <h3>Enter the wallet address in the input field</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AddressItem from "@/components/AddressItem.vue";
import { IMessage } from "@/types/Service.interface";

import { useAddress } from "@/hooks/useAddress";
import { usePlaceholder } from "@/hooks/usePlaceholder";

import { inject, Ref, watch } from "vue";

const props = defineProps<{
  searchText: string;
}>();

usePlaceholder("Input wallet address");

const toast = inject("toast") as Ref<IMessage>;
const { addresses, loadAddress } = useAddress(toast);

watch(
  () => props.searchText,
  (newText) => loadAddress(newText)
);
</script>

<style lang="scss" scoped>
.area__wallet {
  display: flex;
  flex-direction: column;
}
</style>
