<template>
  <!-- <v-dialog v-model:show="dialogVisible">
    <h2>{{ errorSearchMessage }}</h2>
  </v-dialog> -->
  <VHeader @on-search="onSearch" />
  <div class="area__main">
		<router-view :searchText="inputBoxText"/>
  </div>
</template>

<script lang="ts" setup>
import VHeader from "@/components/VHeader.vue";
import { ref } from "@vue/reactivity";

const inputBoxText = ref("");

const onSearch = (text: string): void => {
  inputBoxText.value = text
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
  margin: 15px;
}

</style>
