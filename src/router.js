import { createWebHistory, createRouter } from 'vue-router'

import SchedulePage from './pages/SchedulePage.vue'
import LeaderboardPage from './pages/LeaderboardPage.vue'

const routes = [
  { path: '/', component: SchedulePage },
  { path: '/leaderboard', component: LeaderboardPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})