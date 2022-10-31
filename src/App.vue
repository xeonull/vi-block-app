<template>
  <VHeader @on-search="onSearch" :input_place_holder="inputPlaceholder" />
  <div class="area__main">
    <VSidebar />
    <div class="area__content">
      <router-view :searchText="inputBoxText" @on-place="onPlaceholder" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import VHeader from "@/components/VHeader.vue";
import VSidebar from "@/components/VSidebar.vue";
import { ref } from "@vue/reactivity";

import { useDark } from "@vueuse/core";
import { nextTick } from "vue";
// Load color theme form local storage
useDark({ initialValue: "light" });

const inputBoxText = ref("");
const inputPlaceholder = ref("");

const onSearch = async (text: string): Promise<void> => {
  inputBoxText.value = "";
  await nextTick();
  inputBoxText.value = text;
};

const onPlaceholder = async (text: string): Promise<void> => {
  inputPlaceholder.value = text;
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

:root {
  --color-text: #{$color_text};
  --color-background: #{$color_background};
  --color-background-block: #{$color_background_block};
  --color-toogle: #{$color_background};
  --color-background-toogle: #{$color_primary_light};
  --color-background-toogle-checked: #{$color_background_secondary_strong_light};
}

.dark {
  --color-text: #{$color_text__dark_theme};
  --color-background: #{$color_background__dark_theme};
  --color-background-block: #{$color_background_block__dark_theme};
  --color-toogle: #{$color_background_secondary};
  --color-background-toogle: #{$color_primary};
  --color-background-toogle-checked: #{$color_background_secondary_light};
}

html {
  color: var(--color-text);
  background-color: var(--color-background);
}

html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

h1 {
  margin: 5px 0px;
  font-size: 3ch;
}

h2 {
  margin: 5px 0px;
  font-size: 2.5ch;
}

a {
  color: $color_primary;
  &:hover {
    color: lighten($color_primary, 20%);
    cursor: pointer;
  }
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
  margin: 10px 10px 0px 0px;
  border-radius: 0.25rem;
  max-width: 750px;
  padding: 10px 10px;
  background-color: var(--color-background-block);
  display: inline-block;
  word-break: break-word;
}

.span__not_found {
  font-size: 80px;
  font-weight: bold;
  color: $color_primary_light;
}
</style>
