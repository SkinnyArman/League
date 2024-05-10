<template>
  <table>
    <thead class="bg-grey-main h-10">
      <th v-for="header in tableInfo" :key="header.value" :class="header.class">
        {{ header.header }}
      </th>
    </thead>
    <tbody>
      <tr
        v-for="team in props.leaderboard"
        :key="team.id"
        class="border-grey-main border-b"
      >
        <td
          v-for="column in tableInfo"
          :key="column.value"
          :class="column.class"
        >
          <slot :name="column.value" :team="team">
            {{ team[column.value] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps(["tableInfo", "leaderboard"]);
</script>
