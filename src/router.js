import { createWebHistory, createRouter } from "vue-router";

import SchedulePage from "./pages/SchedulePage.vue";
import LeaderboardPage from "./pages/LeaderboardPage.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
  { path: "/", component: SchedulePage },
  { path: "/schedule", component: SchedulePage, name: "Schedule" },
  { path: "/leaderboard", component: LeaderboardPage, name: "Leaderboard" },
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
