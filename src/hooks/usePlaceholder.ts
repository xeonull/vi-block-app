import { ref } from "@vue/reactivity";

const inputPlaceholder = ref("");
export function usePlaceholder(text?: string) {
  if (text !== undefined) inputPlaceholder.value = text;
  return { inputPlaceholder };
}
