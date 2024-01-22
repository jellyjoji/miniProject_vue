import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Data from "./components/Data.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/data",
    component: Data,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
