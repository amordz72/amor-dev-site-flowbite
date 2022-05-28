<script setup>
import SideBar from "./components/SideBar.vue";
</script>

<template>
  <div class="flex flex-row">
    <SideBar></SideBar>
    <div class="flex-auto bg-slate-300 h-screen">
      <div class="mt-4 px-4">
        <!--   <div class="d-flex">
          
            <h4 class="text-2xl font-bold mb-2">Dashboard
              
            </h4> <p class="text-1xl font-semibold">10-05-2022 / <span>5:14</span></p> 
        </div>-->

        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
