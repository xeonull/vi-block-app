<template>
  <VMobileMenu class="area__main__menu-mobile" />
  <VHeader @on-search="onSearch" />
  <div class="area__main">
    <VSidebar class="area__main__menu-desktop" />
    <div class="area__content">
      <VToast ref="toast" />
      <router-view :searchText="inputBoxText" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IMessage } from "./types/Service.interface";

import VHeader from "@/components/VHeader.vue";
import VSidebar from "@/components/VSidebar.vue";
import VMobileMenu from "@/components/VMobileMenu.vue";
import VToast from "./components/ui/VToast.vue";
import { ref } from "@vue/reactivity";

import { useDark } from "@vueuse/core";
import { nextTick, provide } from "vue";
// Load color theme form local storage
useDark({ initialValue: "light" });

// Provides a link to the Toast component to display the message in the child components
const toast = ref<IMessage>();
provide("toast", toast);

const inputBoxText = ref("");

const onSearch = async (text: string): Promise<void> => {
  inputBoxText.value = "";
  await nextTick();
  inputBoxText.value = text;
};
</script>

<style lang="scss">
@font-face {
  font-family: "Roboto";
  src: local("Roboto"), url("/fonts/Roboto/Roboto-Regular.woff2") format("woff2"), url("/fonts/Roboto/Roboto-Regular.woff") format("woff");
  font-weight: 100;
  font-style: normal;
}
@font-face {
  font-family: "Roboto-Light";
  src: local("Roboto-Light"), url("/fonts/Roboto/Roboto-Light.woff2") format("woff2"), url("/fonts/Roboto/Roboto-Light.woff") format("woff");
  font-weight: 100;
  font-style: normal;
}

:root {
  --color-text: #{$color_text};
  --color-background: #{$color_background};
  --color-background-highlight: #{$color_background-highlight};
  --color-background-block: #{$color_background_block};
  --color-background-control: #{$color_background_secondary_strong_light};
  --color-background-control-checked: #{$color_primary_light};
}

.dark {
  --color-text: #{$color_text__dark_theme};
  --color-background: #{$color_background__dark_theme};
  --color-background-highlight: #{$color_background-highlight__dark_theme};
  --color-background-block: #{$color_background_block__dark_theme};
  --color-background-control: #{$color_background_secondary_light};
  --color-background-control-checked: #{$color_primary};
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
  font-family: Roboto-Light, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin: 0;
  padding: 0;
  // display: flex;
  // flex-direction: column;
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
h3 {
  color: var(--color-background-control-checked);
}

.div__empty {
  margin: auto;
  align-items: center;
  border: 1px;
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

  /* for fixed Header and Sidebar (1) */
  position: absolute;
  top: 50px;
  right: 0;
  bottom: 0;
  left: 0;

  &__menu-mobile {
    display: none;
    @media (max-width: 600px) {
      display: flex;
    }
  }

  &__menu-desktop {
    @media (max-width: 600px) {
      display: none;
    }
  }
}

.area__content {
  flex: 1;
  margin: 0;
  padding: 15px;
  @media (max-width: 600px) {
    padding: 5px;
  }

  /* for fixed Header and Sidebar (2) */
  overflow: auto;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  font-family: Roboto, Helvetica, Arial, sans-serif;
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
