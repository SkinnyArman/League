<template>
  <nav class="bg-blue flex items-center h-15 px-12 justify-between">
    <img src="images/logo.svg" alt="logo"/>
    <div class="flex">
      <RouterLink
        class="inline-flex items-center text-white mr-10 text-body1"
        :to="RoutesEnum.Schedule"
      >
        <img src="images/schedule.png" class="h-6 mr-1" alt="schedule" />
        Schedule
      </RouterLink>
      <RouterLink
        class="inline-flex items-center text-white text-body1"
        :to="RoutesEnum.Leaderboard"
      >
        <img src="images/leaderboard.png" class="h-6 mr-1" alt="leaderbord"/>
        Leaderboard
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { RoutesEnum } from "../../router";
</script>
