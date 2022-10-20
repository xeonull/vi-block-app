<template>
  <div class="area__settings" :class="isDark ? 'dark' : ''">
    <p class="item">Light/Dark Theme:</p>
    <v-button @click="toggleDark()">
      <span class="material-symbols-outlined"> {{ isDark ? "dark_mode" : "light_mode" }} </span>
    </v-button>
  </div>
</template>

<script lang="ts" setup>
import { useDark } from "@vueuse/core";
import { useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style lang="scss" scoped>
.area__settings {
  margin: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.item {
  padding: 0 10px;
  font-weight: bold;
}
</style>
