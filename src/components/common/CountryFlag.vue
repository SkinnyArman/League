<template>
  <img :src="countryFlagURL(props.country)" class="w-13.25 h-9.25" />
</template>

<script setup>
import { FLAG_URL } from "../../constants";

const props = defineProps({
  country: String,
});
const countryFlagURL = (country) => FLAG_URL + country + ".png";
</script>
