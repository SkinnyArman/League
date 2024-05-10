<template>
  <div>
    <nav-bar></nav-bar>
    <div class="px-10 mb-10 mt-15">
      <router-view></router-view>
    </div>
    <app-footer :version="appVersion"></app-footer>
  </div>
</template>

<script setup>
import { provide, onMounted, ref } from "vue";
import LeagueService from "@/services/LeagueService";
import NavBar from "./components/common/NavBar.vue";
import AppFooter from "./components/common/AppFooter.vue";
import { VERSION_URL } from "./constants";

const leagueService = ref(new LeagueService());
const appVersion = ref("");

provide("leagueService", leagueService);

onMounted(async () => {
  await leagueService.value.fetchData();

  if (!appVersion.value) {
    const res = await fetch(`${VERSION_URL}`);
    appVersion.value = (await res.json()).version;
  }
});
</script>
