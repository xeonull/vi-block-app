<template>
  <label class="switch">
    <input type="checkbox" :checked="checked" @change="updateInput" />
    <span class="slider"></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "v-toggle-switch",
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:checked"],
  setup(props, { emit }) {
    const updateInput = (event: Event): void => {
      emit("update:checked", (event.target as HTMLInputElement).checked);
    };
    return { updateInput };
  },
});
</script>

<style scoped lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-background-control);
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  // content: url('../../assets/sun-icon-24.png');
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: var(--color-background);
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--color-background-control-checked);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
  // background-color: var(--color-background);
  // content: url('../../assets/moon-icon-24.png');
}
</style>
