<template>
  <button :disabled="disabled" class="btn" :class="disabled ? 'disable' : ''">
    <slot> </slot>
  </button>
</template>

<script>
export default {
  name: "def-button",
  props: {
    disabled: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style scoped>
.btn {
  align-self: flex-end;
  background: none;
  color: cadetblue;
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
