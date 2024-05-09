<template>
  <nav-bar></nav-bar>
  <div class="px-10">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { provide, onMounted, ref } from 'vue';
import LeagueService from "@/services/LeagueService";
import NavBar from './components/common/NavBar/NavBar.vue'

const leagueService = ref(new LeagueService());

provide('leagueService', leagueService);

onMounted(async () => {
  await leagueService.value.fetchData();
});
</script>