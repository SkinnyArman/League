<template>
  <div class="bg-blue flex items-center h-15 px-12 justify-between">
    <img src="images/logo.svg" />
    <div class="flex text-h1">
      <RouterLink
        class="inline-flex items-center text-white mr-10"
        :to="RoutesEnum.Schedule"
      >
        <img src="images/schedule.png" class="h-6 mr-1" />
        Schedule
      </RouterLink>
      <RouterLink
        class="inline-flex items-center text-white mr-10"
        :to="RoutesEnum.Leaderboard"
      >
        <img src="images/leaderboard.png" class="h-6 mr-1" />
        Leaderboard
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { RoutesEnum } from "../../router";
</script>
