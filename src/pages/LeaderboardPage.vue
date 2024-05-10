<template>
  <div>
    <h1 class="text-h1 text-text-primary font-bold text-center mb-5">
      League Standings
    </h1>
    <LeaderboardTable
      :leaderboard="leaderboard"
      :tableInfo="tableInfo"
      class="w-full"
    >
      <template #teamName="{ team }">
        <div class="flex h-17.5 items-center">
          <CountryFlag :country="team.teamName" class="mr-4" />
          {{ team.teamName }}
        </div>
      </template>
    </LeaderboardTable>
  </div>
</template>

<script setup>
import { inject, computed } from "vue";
import CountryFlag from "../components/common/CountryFlag.vue";
import LeaderboardTable from "../components/Leaderboard/LeaderboardTable.vue";

const leagueService = inject("leagueService");

const leaderboard = computed(() => leagueService.value.getLeaderboard());

const tableInfo = [
  {
    header: "Team Name",
    value: "teamName",
    headerClass: "text-left pl-6",
    columnClass: "text-left pl-6 font-bold"
  },
  {
    header: "MP",
    value: "matchesPlayed",
    headerClass: "text-center",
    columnClass: "text-center"
  },
  {
    header: "GF",
    value: "goalsFor",
    headerClass: "text-center",
    columnClass: "text-center"
  },
  {
    header: "GA",
    value: "goalsAgainst",
    headerClass: "text-center",
    columnClass: "text-center"
  },
  {
    header: "Points",
    value: "points",
    headerClass: "text-center",
    columnClass: "text-center text-blue font-bold"
  },
];
</script>
