import { createApp } from "vue";
import App from "./App.vue";
import components from "@/components/ui";

const app = createApp(App);

// Глобальная регистрация компонентов ui
components.forEach((component) => {
  app.component(component.name, component);
});

app.mount("#app");
