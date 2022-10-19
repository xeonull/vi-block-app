<template>
  <aside :class="`${is_expanded ? 'is-Rexpanded' : ''}`">
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-symbols-outlined"> double_arrow </span>
      </button>
    </div>
    <h3>MENU</h3>
    <div class="menu">
      <router-link to="/price" class="button">
        <span class="material-symbols-outlined" title="Prices"> attach_money </span>
        <span class="text">Prices</span>
      </router-link>
      <router-link to="/block" class="button">
        <span class="material-symbols-outlined" title="Blockchain"> activity_zone </span>
        <span class="text">Blockchain</span>
      </router-link>
      <router-link to="/wallet" class="button">
        <span class="material-symbols-outlined" title="Wallet"> wallet </span>
        <span class="text">Wallet</span>
      </router-link>
    </div>
    <div class="inter-space"></div>
    <div class="menu">
      <router-link to="/settings" class="button">
        <span class="material-symbols-outlined" title="Settings"> settings </span>
        <span class="text">Settings</span>
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

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
  background-color: $color_background_dark;
  min-width: 2rem;
  width: 2rem;
  overflow: hidden;
  padding: 1rem;
  transition: 0.2s ease-in-out;

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

      .material-symbols-outlined {
        font-size: 2rem;
        color: $color_background_secondary;
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-symbols-outlined {
          color: $color_background_secondary_light;
          transform: translateX(0.2rem);
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
  }

  .menu {
    margin: 0 -1rem;
    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-symbols-outlined {
        font-size: 2rem;
        color: $color_primary_light;
        transition: 0.2s ease-in-out;
      }
      .text {
        color: $color_primary_light;
        transition: 0.2s ease-in-out;
      }
      &:hover {
        background-color: $color_background_secondary;
        .material-symbols-outlined,
        .text {
          color: $color_primary;
        }
      }
      &.router-link-active {
        background-color: $color_background_secondary;
        border-right: 5px solid $color_primary;

        .material-symbols-outlined,
        .text {
          color: $color_primary;
        }
      }
    }
  }

  &.is-Rexpanded {
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
      .material-symbols-outlined {
        margin-right: 1rem;
      }
    }
  }
}
</style>
