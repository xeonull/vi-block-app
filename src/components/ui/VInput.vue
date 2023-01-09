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
  margin: 0;
  padding: $input_box_vpadding 15px;
  height: $input_box_height;
  border: $input_box_border_size solid $color_background_secondary_light;
  background: none;
  color: $color_primary_light;
}
.input:focus {
  outline: none !important;
  border: $input_box_border_size solid $color_primary;
}
</style>
