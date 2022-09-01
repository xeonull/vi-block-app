<template>
  <button :disabled="isDisabled" class="btn" :class="{ disable: isDisabled, border: isBorder }">
    <slot> </slot>
  </button>
</template>

<!-- <script lang="ts" setup>
interface Props {
  isDisabled: boolean;
  isBorder: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  isBorder: true,
});
</script> -->

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "v-button",
  props: {
    isDisabled: {
      type: Boolean,
      required: false,
    },
    isBorder: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
});
</script>

<style scoped lang="scss">
.btn {
  background: none;
  color: $color_primary;
  border: 0;
}
.border {
  border: 1px solid $color_primary;
}
.disable {
  opacity: 0.4;
  pointer-events: none;
}
.btn:hover:not(.disable) {
  filter: brightness(120%);
}
.btn:active:not(.disable) {
  filter: brightness(90%);
  transform: translateY(1px) translateX(1px);
}
</style>
