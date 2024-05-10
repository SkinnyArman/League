<template>
  <table>
    <thead class="bg-grey-main text-text-main h-10">
      <th v-for="row in tableInfo" :key="row.value" :class="row.headerClass">
        {{ row.header }}
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
          :class="column.columnClass"
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
