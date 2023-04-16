<template>
  <!-- <aside :class="`${is_expanded ? 'is-expanded' : ''}`"> -->
  <aside :class="{ 'is-expanded': is_expanded }">
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icon"><v-icon name="double_arrow" /></span>
      </button>
    </div>
    <h3>MENU</h3>
    <div class="menu" v-for="menuItem in arraySideMenu" :key="menuItem.id">
      <router-link :to="menuItem.link" class="button">
        <span class="material-icon" :title="menuItem.title">
          <v-icon :name="menuItem.mt_icon" />
        </span>
        <span class="text">{{ menuItem.title }}</span>
      </router-link>
    </div>
    <div class="inter-space"></div>
    <div class="menu" v-for="menuItem in arrayBottomSideMenu" :key="menuItem.id">
      <router-link :to="menuItem.link" class="button">
        <span class="material-icon" :title="menuItem.title">
          <v-icon :name="menuItem.mt_icon" />
        </span>
        <span class="text">{{ menuItem.title }}</span>
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useSideMenu } from "@/hooks/useSideMenu";
import VIcon from "@/components/VIconStorage.vue";

const { arraySideMenu, arrayBottomSideMenu } = useSideMenu();

const is_expanded = ref(localStorage.getItem("is_expanded") !== "false");

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value.toString());
};
</script>

<style lang="scss">
aside {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  background-color: $color_background_block__dark_theme;
  min-width: 2rem;
  width: 2rem;
  overflow: hidden;
  padding: 1rem;
  transition: 0.2s ease-in-out;
  z-index: 12;

  .inter-space {
    flex: 1 1 0%;
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;

      .material-icon {
        font-size: 2rem;
        color: $color_background_secondary;
        transition: 0.2s ease-out;
        & svg {
          fill: $color_background_secondary;
          transition: 0.2s ease-out;
        }
      }

      &:hover {
        .material-icon {
          color: $color_background_secondary_light;
          transform: translateX(0.2rem);
          & svg {
            fill: $color_background_secondary_light;
            transform: translateX(0.2rem);
          }
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  h3 {
    margin: 0.5rem 0;
    font-size: 0.8rem;
    color: $color_text;
  }

  .menu {
    margin: 0 -1rem;
    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icon {
        font-size: 2rem;
        color: $color_primary_light;
        & svg {
          fill: $color_primary_light;
          transition: 0.2s ease-in-out;
        }
      }
      .text {
        color: $color_primary_light;
        transition: 0.2s ease-in-out;
      }
      &:hover {
        background-color: $color_background_secondary;
        .material-icon,
        .text {
          color: $color_primary;
          & svg {
            fill: $color_primary;
          }
        }
      }
      &.router-link-active {
        background-color: $color_background_secondary;
        border-right: 5px solid $color_primary;

        .material-icon,
        .text {
          color: $color_primary;
          & svg {
            fill: $color_primary;
          }
        }
      }
    }
  }

  &.is-expanded {
    width: 200px;

    .menu-toggle-wrap {
      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icon {
        margin-right: 1rem;
      }
    }
  }
}
</style>
