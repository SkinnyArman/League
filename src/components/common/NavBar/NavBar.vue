<template>
  <div class="bg-blue flex items-center h-16 px-12 justify-between">
    <img src="images/logo.svg" />
    <div class="flex text-h1">
      <RouterLink class="inline-flex items-center text-white mr-10" to="/">
        <img src="images/schedule.png" class="h-6 mr-1" />
        Schedule
      </RouterLink>
      <RouterLink class="inline-flex items-center text-white mr-10" to="/leaderboard">
        <img src="images/leaderboard.png" class="h-6 mr-1" />
        Leaderboard
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
