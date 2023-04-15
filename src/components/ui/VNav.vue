<template>
  <div class="nav">
    <ul>
      <li v-for="link in links" :key="link">
        <a @click.prevent="onClick($event)" :class="{ active: link == activeLink }" href="/">{{ link }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "v-select",

  props: {
    activeLink: {
      type: String,
      default: "",
    },
    links: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },

  emits: ["update:selectedLink"],

  setup(props, { emit }) {
    const onClick = (event: Event): void => {
      const newValue = (event.target as HTMLLinkElement).textContent;
      if (props.activeLink !== newValue) emit("update:selectedLink", newValue);
    };

    return { onClick };
  },
});
</script>

<style lang="scss" scoped>
.nav {
  margin: 0;
  z-index: 10;
  opacity: 82%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
.nav ul {
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav ul li a {
  display: flex;
  padding: 15px 40px;
  color: var(--color-text);
  text-decoration: none;
  text-transform: uppercase;
  border-bottom: 1px solid $color_background_secondary_light;
  @media (max-width: 600px) {
    padding: 15px 20px;
  }
}
.nav ul li a.active {
  background: $color_background_secondary_light;
  color: $color_background;
}
.nav ul li a:hover {
  background: $color_primary;
  color: $color_background;
}
</style>
