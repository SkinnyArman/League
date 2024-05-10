<template>
  <div>
    <h1 class="text-h1 text-text-primary font-bold text-center mb-5">
      League Schedule
    </h1>
    <BaseTable
      class="w-full"
      :items="leagueService.getMatches()"
      row-key="stadium"
      :table-info="tableInfo"
      :striped="true"
    >
      <template #matchDate="{ item }">
        {{ formatDate(item.matchDate) }}<br />{{
          formatDateByHour(item.matchDate)
        }}
      </template>
      <template #homeTeam="{ item }">
        <span class="mr-4 font-bold">{{ item.homeTeam }}</span>
        <country-flag :country="item.homeTeam"></country-flag
      ></template>
      <template #score="{ item }">
        {{ item.homeTeamScore }} : {{ item.awayTeamScore }}
      </template>
      <template #awayTeam="{ item }">
        <country-flag :country="item.awayTeam" class="mr-4"></country-flag>
        <span class="font-bold">{{ item.awayTeam }}</span>
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { formatDate, formatDateByHour } from "../helpers";
import CountryFlag from "../components/common/CountryFlag.vue";
import BaseTable from "../components/common/BaseTable.vue";

const leagueService = inject("leagueService");

const tableInfo = [
  {
    header: "Date/Time",
    headerClass: "text-left pl-6 hidden md:table-cell",
    columnClass: "hidden md:table-cell pl-6",
    value: "matchDate",
  },
  {
    header: "Stadium",
    headerClass: "text-left hidden md:table-cell",
    columnClass: "hidden md:table-cell",
    value: "stadium",
  },
  {
    header: "Home Team",
    headerClass: "text-right",
    columnClass: "inline-flex w-full items-center justify-end h-20",
    value: "homeTeam",
  },
  {
    header: "",
    headerClass: "",
    columnClass: "text-center font-bold mx-4",
    value: "score",
  },
  {
    header: "Away Team",
    headerClass: "text-left",
    columnClass: "inline-flex items-center h-20",
    value: "awayTeam",
  },
];
</script>
