import { DirectiveBinding } from "vue";

const formatting = (el: HTMLElement, binding: DirectiveBinding) => {
  el.innerHTML = binding.value.value
    ? binding.value.value.toLocaleString("eu-US", {
        style: "currency",
        minimumSignificantDigits: 1,
        currency: binding.value.currency,
      })
    : "---";
};

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    formatting(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    formatting(el, binding);
  },
  name: "currencyformat",
};
