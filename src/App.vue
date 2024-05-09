<template>
  <nav-bar></nav-bar>
  <div class="px-10">
    <router-view></router-view>
  </div>
</template>

<script setup>
import NavBar from './components/common/NavBar/NavBar.vue'
</script>