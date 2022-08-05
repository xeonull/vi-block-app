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

<style scoped>
.input {
  border: 1px solid teal;
  padding: 10px 15px;
  background: none;
  color: #c4c4c4;
}
</style>
