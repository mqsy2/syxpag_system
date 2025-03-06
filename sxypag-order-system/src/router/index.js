import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Order from "../views/Order.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/order", component: Order },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;