<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "def-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event: Event) {
      this.$emit("update:modelValue", (event.target as HTMLInputElement).value);
    },
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
