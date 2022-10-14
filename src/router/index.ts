import { createRouter, createWebHistory, Router } from "vue-router";

export default <Router>createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/block",
      component: () => import("@/views/PageBlock.vue"),
      alias: "/",
    },
    {
      path: "/price",
      component: () => import("@/views/PagePrice.vue"),
    },
    {
      path: "/wallet",
      component: () => import("@/views/PageWallet.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/PageNotFound.vue"),
    },
  ],
});
