<template>
  <div>
    <h1 class="text-h1 text-text-primary font-bold text-center mb-5">
      League Schedule
    </h1>
    <table class="w-full">
      <thead class="bg-grey-main h-10 text-text-main">
        <th class="text-left pl-6">Date/Time</th>
        <th class="text-left hidden md:table-cell">Stadium</th>
        <th class="text-right">Home Team</th>
        <th class="text-"></th>
        <th class="text-left">Away Team</th>
      </thead>
      <tbody>
        <tr
          class="h-20"
          v-for="(match, index) in leagueService.getMatches()"
          :key="match.stadium"
          :class="{ 'bg-grey-light': isOdd(index) }"
        >
          <td class="pl-6">
            {{ formatDate(match.matchDate) }}<br />{{
              formatDateByHour(match.matchDate)
            }}
          </td>
          <td class="hidden md:table-cell">{{ match.stadium }}</td>
          <td class="inline-flex w-full items-center justify-end h-20">
            <span class="mr-4 font-bold">{{ match.homeTeam }}</span>
            <country-flag :country="match.homeTeam"></country-flag>
          </td>
          <td class="text-center font-bold">
            {{ match.homeTeamScore }} : {{ match.awayTeamScore }}
          </td>
          <td class="inline-flex items-center h-20">
            <country-flag :country="match.awayTeam" class="mr-4"></country-flag>
            <span class="font-bold">{{ match.awayTeam }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { formatDate, formatDateByHour } from "../helpers";
import CountryFlag from "../components/common/CountryFlag.vue";

const leagueService = inject("leagueService");
const isOdd = (number) => number % 2 == 1;
</script>
