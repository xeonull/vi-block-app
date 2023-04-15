<template>
  <div class="nav">
    <ul>
      <li>
        <div class="cur">
          <span class="txt">{{ currentValue }}</span>
          <span class="arrow">⯈</span>
        </div>
        <ul>
          <li v-for="val in listOfValues" @click="onClick($event)" :key="val">{{ val }}</li>
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

<style lang="scss" scoped>
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

.nav ul li:hover .cur {
  color: var(--color-text);
  > .arrow {
    visibility: visible;
    padding-left: 10px;
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
.nav ul li .cur {
  display: inline-block;
  padding: 15px 10px 16px 20px;
  color: var(--color-text);
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}
.nav ul ul li {
  position: relative;
  padding: 16px 50px;
  color: var(--color-text);
  text-transform: uppercase;
  cursor: pointer;
}
.nav ul ul li:hover {
  background: var(--color-background-control-checked);
}
</style>
