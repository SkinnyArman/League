<template>
  <table>
    <thead class="bg-grey-main text-text-main h-10">
      <th v-for="row in tableInfo" :key="row.value" :class="row.headerClass">
        {{ row.header }}
      </th>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in props.items"
        :key="item[props.rowKey] + index.toString()"
        :class="{ 'bg-grey-light': isOdd(index) && props.striped }"
        class="border-grey-main text-text-main border-b"
      >
        <td
          v-for="column in tableInfo"
          :key="column.value"
          :class="column.columnClass"
        >
          <slot :name="column.value" :item="item">
            {{ item[column.value] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
// using validator since TS is not in the project.
const props = defineProps({
  tableInfo: {
    type: Array,
    default: () => [],
    validator: (tableInfos) => {
      return tableInfos.every(
        (tableInfo) =>
          "header" in tableInfo &&
          "headerClass" in tableInfo &&
          "columnClass" in tableInfo &&
          "value" in tableInfo
      );
    },
  },
  items: {
    type: Array,
    default: () => [],
  },
  striped: {
    type: Boolean,
    default: false,
  },
  rowKey: {
    type: String,
    required: true,
  },
});
const isOdd = (number) => number % 2 == 1;
</script>
