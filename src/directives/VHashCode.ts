import { DirectiveBinding } from "vue";

const shortening = (el: HTMLElement, binding: DirectiveBinding) => {
  const left = 8,
    right = 8;
  el.innerHTML = binding.value.slice(0, left) + "..." + binding.value.slice(binding.value.length - right, binding.value.length);
};

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    shortening(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    shortening(el, binding);
  },
  name: "hashcode",
};
