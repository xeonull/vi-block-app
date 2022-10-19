import { DirectiveBinding } from "vue";

const localization = (el: HTMLElement, binding: DirectiveBinding) => {
  el.innerHTML = new Date(binding.value).toLocaleString();
};

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    localization(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    localization(el, binding);
  },
  name: "datetimeformat",
};
