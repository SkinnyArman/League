<template>
  <div>{{ leagueService.getMatches() }}</div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import LeagueService from "@/services/LeagueService"; // Adjust the path as necessary

const leagueService = inject('leagueService');
</script>