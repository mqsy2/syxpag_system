import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Order from "../views/Order.vue";
import Transaction from "../views/Transaction.vue";
import Supply from "../views/Supply.vue";
import Pricing from "../views/Pricing.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/order", component: Order },
  { path: "/transactions", component: Transaction },
  { path: "/supply", component: Supply },
  { path: "/pricing", component: Pricing },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;