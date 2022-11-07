<template>
  <div class="nav">
    <ul>
      <li>
        <div>
          <a>{{ currentValue }}</a
          ><span class="arrow">⯈</span>
        </div>
        <ul>
          <li v-for="val in listOfValues" :key="val">
            <a @click.prevent="onClick($event)" href="/">{{ val }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "v-select",

  props: {
    currentValue: {
      type: String,
      default: "",
    },
    listOfValues: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },

  emits: ["update:currentValue"],

  setup(props, { emit }) {
    const onClick = (event: Event): void => {
      const newValue = (event.target as HTMLLinkElement).textContent;
      if (props.currentValue !== newValue) emit("update:currentValue", newValue);
    };

    return { onClick };
  },
});
</script>

<style scoped lang="scss">
.nav {
  margin: 0;
  z-index: 10;
  opacity: 82%;
}
.arrow {
  visibility: hidden;
}
.nav ul ul {
  display: none;
}
.nav ul li:hover > ul {
  display: block;
}
.nav ul {
  list-style: none;
  position: relative;
  display: inline;
  margin: 0;
  padding: 0;
}
.nav ul li:hover {
  background: var(--color-background-block);
}
.nav ul li:hover a {
  color: var(--color-text);
  + .arrow {
    visibility: visible;
  }
}
.nav ul ul {
  background: var(--color-background-block);
  border-radius: 0px;
  padding: 0;
  position: absolute;
  left: 100%;
  top: 0;
}
.nav ul li a {
  display: inline-block;
  padding: 15px 10px 15px 20px;
  color: var(--color-text);
  text-decoration: none;
  text-transform: uppercase;
}
.nav ul ul li {
  position: relative;
}
.nav ul ul li a {
  padding: 15px 50px;
  color: var(--color-text);
}
.nav ul ul li a:hover {
  background: var(--color-background-control-checked);
}
</style>
