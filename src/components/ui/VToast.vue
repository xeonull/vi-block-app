<template>
  <div class="toasted" :class="{ show: isVisible }">{{ message }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "v-toast",
  setup() {
    const message = ref("");
    const isVisible = ref(false);

    const show = (text: string): void => {
      message.value = text;
      isVisible.value = true;
      setTimeout(() => {
        isVisible.value = false;
      }, 4990);
    };

    return { isVisible, message, show };
  },
});
</script>

<style scoped lang="scss">
.toasted {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: $color_message_background;
  color: $color_background;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 30;
  left: 50%;
  bottom: 30px;
}

.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 4.5s;
  animation: fadein 0.5s, fadeout 0.5s 4.5s;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
