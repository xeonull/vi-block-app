<template>
  <button :disabled="isDisabled" class="btn" :class="{ disable: isDisabled, border: isBorder }">
    <slot> </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "def-button",
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

<style scoped>
.btn {
  background: none;
  color: cadetblue;
  border: 0;
}
.border {
  border: 1px solid cadetblue;
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
