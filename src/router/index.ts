import { createRouter, createWebHistory, Router } from "vue-router";

export default <Router>createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/block",
      // we need this to render the children (To make this easier to use, we could maybe allow component to be
      // absent and internally behave as if there where a component option that renders a RouterView component)
      //component: { render: () => h(RouterView) },
      alias: "/",
      children: [
        {
          path: "",
          component: () => import("@/views/PageBlockchain.vue"),
        },
        {
          path: ":id",
          name: "block",
          component: () => import("@/views/PageBlock.vue"),
        },
      ],
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
