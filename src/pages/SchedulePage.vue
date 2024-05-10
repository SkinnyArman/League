<template>
  <div>
    <h1 class="text-h1 text-text-main font-bold text-center mb-5">
      League Schedule
    </h1>
    <table class="w-full">
      <thead class="bg-grey-main h-10">
        <th class="text-left">Date/Time</th>
        <th class="text-left">Stadium</th>
        <th class="text-right">Home Team</th>
        <th class="text-"></th>
        <th class="text-left">Away Team</th>
      </thead>
      <tbody>
        <tr
          class="h-20"
          v-for="match in leagueService.getMatches()"
          :key="match.stadium"
        >
          <td>5.5.2020<br />11:50</td>
          <td>{{ match.stadium }}</td>
          <td class="inline-flex w-full items-center justify-end h-20">
            <span class="mr-4">{{ match.homeTeam }}</span>
            <img
              :src="`https://flagsapi.codeaid.io/${match.homeTeam}.png`"
              class="w-12 h-10"
            />
          </td>
          <td class="text-center">
            {{ match.homeTeamScore }} : {{ match.awayTeamScore }}
          </td>
          <td class="inline-flex items-center h-20">
            <img
              :src="`https://flagsapi.codeaid.io/${match.awayTeam}.png`"
              class="w-12 h-10 mr-4"
            />
            <span>{{ match.awayTeam }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import LeagueService from "@/services/LeagueService"; // Adjust the path as necessary

const leagueService = inject('leagueService');
</script>
