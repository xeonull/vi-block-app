<template>
  <div class="header">
    <div class="logo">
      <div class="square__left"></div>
      <div class="square__right"></div>
    </div>
    <div class="search">
      <def-input v-model="input_address" class="input__search" type="text" placeholder="Input wallet address" />
      <def-button @click="onSearch" :isBorder="false" class="btn__search"><img src="../assets/lens-glass-16.png" /></def-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "vi-header",
  data() {
    return {
      input_address: "",
    };
  },

  methods: {
    onSearch() {
      //this.post.id = Date.now();
      this.$emit("search", this.input_address);
    },
  },
});
</script>

<style scoped>
.header {
  margin: 0;
  box-shadow: rgba(0, 0, 0, 0.7) 0 4px 12px;
  box-sizing: border-box;
  padding: 1px;
  background: rgb(26, 26, 26);
  height: 50px;
  display: flex;
  flex-direction: row;
}

.search {
  /* border: 1px solid deeppink; */
  margin: auto;
  margin-top: 10px;
  background: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 418px;
  background: rgb(56, 56, 56);
}

.input__search {
  margin-right: 2px;
  display: inline-block;
  width: 120%;
  min-width: 150px;
  max-width: 350px;
  height: 10px;
}

.btn__search {
  margin: 0;
  margin-left: 2px;
  display: inline-block;
  height: 30px;
  border: 0;
}

.logo {
  /* border: 1px solid deeppink; */
  margin: 15px;
  background: none;
  display: flex;
  flex-direction: row;
}

.square__left {
  margin: 0;
  display: inline-block;
  box-sizing: border-box;
  height: 20px;
  width: 20px;
  border: 4px solid cadetblue;
}

.square__right {
  margin: 0;
  margin-top: 8px;
  display: inline-block;
  box-sizing: border-box;
  margin-left: 2px;
  height: 12px;
  width: 12px;
  border: 2px solid rgb(183, 225, 228);
}
</style>
