<template>
  <div class="flex flex-row">
    <SideBar></SideBar>
    <div class="flex-auto bg-slate-300 h-screen">
      <Navbar></Navbar>

      <div class="content mt-4 px-4">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
import SideBar from "./components/SideBar.vue";
import Navbar from "./components/Navbar.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
