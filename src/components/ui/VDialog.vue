<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <!-- Модификатор .stop для предотвращения всплытия события нажатия, чтобы окно закрывалось только при нажатии на внешнуюю область -->
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "v-dialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:show"],
  setup(props, { emit }) {
    const hideDialog = (): void => {
      emit("update:show", false);
    };
    return { hideDialog };
  },
});
</script>

<style scoped lang="scss">
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  display: flex;
  background: rgb(0, 0, 0, 0.8);
  z-index: 999;
}

.dialog__content {
  margin: auto;
  padding: 20px;
  background: var(--color-background);
  border-radius: 2px;
  min-width: 200px;
  min-height: 50px;
  max-width: 80vw;
  max-height: 80vh;
  overflow: auto;
}
</style>
