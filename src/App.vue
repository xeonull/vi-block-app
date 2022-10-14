<template>
  <!-- <v-dialog v-model:show="dialogVisible">
    <h2>{{ errorSearchMessage }}</h2>
  </v-dialog> -->
  <VHeader @on-search="onSearch" />
  <div class="area__main">
    <VSidebar />
    <div class="area__content">
      <router-view :searchText="inputBoxText" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import VHeader from "@/components/VHeader.vue";
import VSidebar from "@/components/VSidebar.vue";
import { ref } from "@vue/reactivity";

const inputBoxText = ref("");

const onSearch = (text: string): void => {
  inputBoxText.value = text;
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: $color_text;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
	min-height: 100vh;
}

html,
body {
  margin: 0;
  padding: 0;
  background-color: $color_background_primary;
}

h1 {
  margin: 5px 0px;
  font-size: 3ch;
}

h2 {
  margin: 5px 0px;
  font-size: 2.5ch;
}

.area__main {
  margin: 0;
  display: flex;
  flex-grow: 1;
}

.area__content {
  flex: 1;
  margin: 0;
  padding: 15px;
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.block {
  margin-top: 5px;
  border: 1px solid rgba(0, 0, 0);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  padding: 10px 10px;
  background: $color_background_primary;
  display: inline-block;
  word-break: break-word;
}
</style>
