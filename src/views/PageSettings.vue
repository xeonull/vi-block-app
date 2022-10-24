<template>
  <v-dialog v-model:show="isDialogVisible">
    <h2>Dialog box title</h2>
    <p>Sample text here</p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae praesentium pariatur, doloribus fugiat quia rerum, corrupti perspiciatis officia
      voluptatem tempore magni corporis, eligendi dolorem vitae! Possimus voluptatibus ducimus dicta, non quidem rerum facilis iusto sit soluta voluptatum quae,
      excepturi tempore, voluptate saepe sed. A, natus earum assumenda fuga ea, aspernatur mollitia cumque cum, non commodi et. Assumenda quae accusantium
      voluptatibus, sed eius accusamus quibusdam quas iste laborum sapiente mollitia fugiat exercitationem tenetur necessitatibus voluptatem voluptates officia
      officiis fugit suscipit illum. Blanditiis quo quae debitis. Aliquam atque repudiandae accusantium?
    </p>
  </v-dialog>
  <div class="area__settings">
    <div class="row__setting">
      <p class="item">Light/Dark Theme:</p>
      <v-button @click="toggleDark()">
        <span class="material-symbols-outlined"> {{ isDark ? 'dark_mode' : 'light_mode' }} </span>
      </v-button>
    </div>
    <div class="row__setting">
      <p class="item">Dialog box:</p>
      <a @click="openDialog()"> Open </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import { useToggle } from '@vueuse/core'
import { ref } from 'vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const isDialogVisible = ref(false)
const openDialog = () => (isDialogVisible.value = true)
</script>

<style lang="scss" scoped>
.area__settings {
  margin: 20px;
  display: flex;
  flex-direction: column;
}
.row__setting {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.item {
  padding: 0 10px;
  font-weight: bold;
}
</style>
