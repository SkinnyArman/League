import { createWebHistory, createRouter } from "vue-router";

import Schedule from "./pages/Schedule.vue";
import Leaderboard from "./pages/Leaderboard.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
  { path: "/", component: Schedule },
  { path: "/schedule", component: Schedule, name: "Schedule" },
  { path: "/leaderboard", component: Leaderboard, name: "Leaderboard" },
  { path: "/:notFound", component: NotFound, name: "404" },
];

export const RoutesEnum = {
  Schedule: "/schedule",
  Leaderboard: "/leaderboard",
  NotFound: '/404'
};

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
