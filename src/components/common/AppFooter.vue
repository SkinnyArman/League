<template>
  <footer
    class="px-10 h-10 fixed bottom-0 w-full flex justify-end text-text-main text-text-grey bg-grey-light items-center font-bold"
  >
    API Version: <span class="ml-1">{{ props.version }}</span>
  </footer>
</template>

<script setup>
const props = defineProps({
  version: String,
});
</script>
