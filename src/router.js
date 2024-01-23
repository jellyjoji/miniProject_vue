import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Data from "./components/Data.vue";
import NotFound from "./components/NotFound.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/data",
    component: Data,
  },
  {
    path: "/notfound",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/notfound",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
