import { createApp } from "vue";
import App from "@/App.vue";
import components from "@/components/ui";
import store from "@/store";
import router from "@/router";
import directives from "@/directives/";

const app = createApp(App);

// Глобальная регистрация компонентов ui
components.forEach((component) => {
  app.component(component.name, component);
});

// Глобальная регистрация директив
directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app
  // Регистрация vuex-стора
  .use(store)
  // Регистрация роутера
  .use(router)
  .mount("#app");
