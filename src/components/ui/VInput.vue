<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "v-input",
  props: {
    modelValue: [String, Number],
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const updateInput = (event: Event): void => {
      emit("update:modelValue", (event.target as HTMLInputElement).value);
    };
    return { updateInput };
  },
});
</script>

<style scoped lang="scss">
.input {
  border: 1px solid $color_background_secondary_light;
  padding: 10px 15px;
  background: none;
  color: $color_primary_light;
}
.input:focus {
  outline: none !important;
  border: 1px solid $color_primary;
}
</style>
