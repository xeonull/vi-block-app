<template>
  <div class="header">
    <div class="logo">
      <div class="square__left"></div>
      <div class="square__right"></div>
    </div>
    <div class="search">
      <v-input v-model="input_text" class="input__search" type="text" @keyup.enter="onSearch" :placeholder="inputPlaceholder" :disabled="!inputPlaceholder" />
      <v-button @click="onSearch" :isBorder="false" class="btn__search">
        <v-icon name="search" class="icn" />
      </v-button>
    </div>
    <div class="header__right"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import VIcon from "@/components/VIconStorage.vue";
import { usePlaceholder } from "@/hooks/usePlaceholder";
const { inputPlaceholder } = usePlaceholder();

const input_text = ref("");

const emit = defineEmits<{ (e: "on-search", value: string): void }>();

const onSearch = (): void => {
  if (input_text.value.trim().length) emit("on-search", input_text.value.trim());
  else input_text.value = "";
};
</script>

<style lang="scss" scoped>
.header {
  margin: 0;
  box-shadow: rgba(0, 0, 0, 0.7) 0 2px 6px;
  box-sizing: border-box;
  padding: 1px;
  background: $color_background_block__dark_theme;
  height: 50px;
  display: flex;
  // z-index: 11;
  &__right {
    min-width: $header_margin_right_left;
  }
}

.search {
  // border: 1px solid deeppink;
  margin: auto;
  margin-top: 8px;
  background: none;
  display: flex;
  // align-items: center;
  width: $search_box_width;
  background: $color_background_secondary;
  z-index: 13;
}

.input__search {
  // margin-right: 2px;
  display: block;
  width: 100%;
  min-width: 150px;
}

.btn__search {
  margin: 0 2px;
  display: inline-block;
  height: $search_box_height;
  border: 0;
  width: $search_box_button_width;
  svg {
    height: 26px;
    width: 26px;
    margin: -3px 0 0 -3px;
  }
}

.logo {
  // border: 1px solid deeppink;
  margin: 15px $header_margin_right_left;
  background: none;
  display: flex;
  @media (max-width: 600px) {
    visibility: hidden;
  }
}

.square__left {
  margin: 0;
  display: inline-block;
  box-sizing: border-box;
  height: 20px;
  width: 20px;
  border: 4px solid $color_primary;
}

.square__right {
  margin: 0;
  margin-top: 8px;
  display: inline-block;
  box-sizing: border-box;
  margin-left: 2px;
  height: 12px;
  width: 12px;
  border: 2px solid $color_primary_light;
}
</style>
