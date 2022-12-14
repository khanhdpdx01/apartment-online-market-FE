import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("../views/Shop.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../components/product/ProductOverview.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../components/shopping-cart/ShoppingCart.vue"),
  },
  {
    path: "/registerSeller",
    name: "RegisterSeller",
    component: () => import("../views/RegisterSeller.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
