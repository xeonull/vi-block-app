<template>
  <nav role="navigation">
    <div id="menuToggle">
      <input type="checkbox" ref="checkbox_toggle" />
      <span class="span_icon"></span>
      <span class="span_icon"></span>
      <span class="span_icon"></span>
      <ul id="menu" @click="menuClick">
        <li v-for="menuItem in arraySideMenu" :key="menuItem.id">
          <router-link :to="menuItem.link" class="button">
            <span class="material-symbols-outlined" :title="menuItem.title"> {{ menuItem.mt_icon }}</span>
            <span class="text">{{ menuItem.title }}</span>
          </router-link>
        </li>
        <li class="inter-space"></li>
        <li v-for="menuItem in arrayBottomSideMenu" :key="menuItem.id">
          <router-link :to="menuItem.link" class="button">
            <span class="material-symbols-outlined" :title="menuItem.title"> {{ menuItem.mt_icon }}</span>
            <span class="text">{{ menuItem.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { Ref, ref } from "vue";

import { useSideMenu } from "@/hooks/useSideMenu";

const { arraySideMenu, arrayBottomSideMenu } = useSideMenu();

const checkbox_toggle: Ref<HTMLInputElement | undefined> = ref();

const menuClick = (e: Event) => {
  // Сворачиваем меню, если пользователь выбрал один из пунктов
  if (e.target instanceof HTMLSpanElement && checkbox_toggle.value && "checked" in checkbox_toggle.value) checkbox_toggle.value.checked = false;
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  opacity: 1;
  font-size: 1.5em;
  font-weight: 400;
  transition: 200ms;
}
a:hover {
  opacity: 0.5;
}
ul {
  padding: 0;
  list-style-type: none;
}
nav {
  height: 65px;
  z-index: 15;
  width: 65px;
  position: absolute;
  margin: 0;
}

#menuToggle {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 18px;
  left: $header_margin_right_left;
  z-index: 1;
  -webkit-user-select: none;
  user-select: none;
}

#menuToggle input {
  display: flex;
  width: 40px;
  height: 32px;
  position: absolute;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
  -webkit-tap-highlight-color: transparent; // Убирает выделение инпута при нажатии на мобильном устройстве
}

#menuToggle .span_icon {
  display: flex;
  width: 29px;
  height: 2px;
  margin-bottom: 5px;
  position: relative;
  background: $color_background;
  border-radius: 3px;
  z-index: 1;
  transform-origin: 5px 0px;
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
}

#menuToggle .span_icon:first-child {
  transform-origin: 0% 0%;
}

#menuToggle .span_icon:nth-last-child(2) {
  transform-origin: 0% 100%;
}

#menuToggle input:checked ~ .span_icon {
  opacity: 1;
  transform: rotate(45deg) translate(-3px, -1px);
  background: var(--color-text);
}
#menuToggle input:checked ~ .span_icon:nth-last-child(3) {
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

#menuToggle input:checked ~ .span_icon:nth-last-child(2) {
  transform: rotate(-45deg) translate(0, -1px);
}

#menu {
  position: fixed;
  right: 0px;
  left: 0px;
  margin: -50px 0 0 -50px;
  padding: 50px;
  padding-top: 125px;
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  top: 30px;
  bottom: 0;
}

.material-symbols-outlined {
  margin-right: 1rem;
  font-size: 2rem;
  vertical-align: top;
}

#menu li {
  padding: 10px;
  transition-delay: 2s;
}

#menuToggle input:checked ~ ul {
  transform: none;
}
.inter-space {
  flex: 1 1 0%;
}
</style>
