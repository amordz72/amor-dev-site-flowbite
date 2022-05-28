<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="flex flex-row">
    <div
      class="flex h-screen w-64 flex-col justify-between bg-gray-200"
      id="sb"
    >
      <div class="top">
        <div class="my-4 flex items-center justify-between px-5">
          <b>Application</b>
          <input type="checkbox" class="hidden" id="btn-tgl" />
          <label for="btn-tgl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
        </div>

        <!-- link1 -->
        <div class="flex flex-col px-2">
          <div class="p2 hover:bg-pink-200">
            <div class="flex cursor-pointer flex-row space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-pink-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <h4 class="font-bold text-gray-500 hover:text-pink-600">
                Dashboard
              </h4>
            </div>
          </div>
        </div>
        <!-- link2 -->
        <div class="flex flex-col px-2">
          <div class="p2 hover:bg-pink-200">
            <div class="flex cursor-pointer flex-row space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-pink-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h4 class="font-bold text-gray-500 hover:text-pink-600">
                Statits
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div class="p-1">
        <button class="bg-pink-700 rounded-full p-2 text-white/90 w-full">
          Logout
        </button>
      </div>
    </div>
    <div class="flex-auto bg-slate-400 h-screen">
      <div class="mt-4 px-4">
        <h4 class="text-2xl font-bold mb-2">Dashboard</h4>
        <p class="text-1xl font-semibold">10-05-2022 / <span>5:14</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
