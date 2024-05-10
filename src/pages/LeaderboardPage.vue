<template>
  <div>
    <h1 class="text-h1 text-text-main font-bold text-center mb-5">
      League Standings
    </h1>
    <LeaderboardTable
      :leaderboard="leaderboard"
      :tableInfo="tableInfo"
      class="w-full"
    >
      <template v-slot:teamName="{ team }">
        <div class="flex h-16 items-center">
          <CountryFlag :country="team.teamName" class="mr-4" />
          {{ team.teamName }}
        </div>
      </template>
    </LeaderboardTable>
  </div>
</template>

<script setup>
import { onMounted, ref, inject, computed } from "vue";
import CountryFlag from "../components/common/CountryFlag.vue";
import LeagueService from "@/services/LeagueService"; // Adjust the path as necessary
import LeaderboardTable from "../components/Leaderboard/LeaderboardTable.vue";

const leagueService = inject("leagueService");

const leaderboard = computed(() => leagueService.value.getLeaderboard());

setTimeout(() => {
  console.log(leaderboard.value)
}, 2000);
const tableInfo = [
  {
    header: "Team Name",
    value: "teamName",
    class: "text-left",
  },
  {
    header: "MP",
    value: "matchesPlayed",
    class: "text-center",
  },
  {
    header: "GF",
    value: "goalsFor",
    class: "text-center",
  },
  {
    header: "GA",
    value: "goalsAgainst",
    class: "text-center",
  },
  {
    header: "Points",
    value: "points",
    class: "text-center",
  },
];
</script>
