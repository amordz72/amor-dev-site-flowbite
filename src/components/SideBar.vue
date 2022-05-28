<template>
  <div class="flex h-screen w-64 flex-col justify-between bg-gray-200  " id="sb">
    <div class="top">
      <div class="my-4 flex items-center justify-between px-5">
        <b class="sb-title">Application</b>
        <input type="checkbox" class="hidden" id="btn-tgl" @click="tgl" />
        <label for="btn-tgl" class="lbl-tgl">
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

      <!-- / -->
      <div class="flex flex-col px-2 mb-2">
        <div class="p2 hover:bg-pink-200">
          <router-link to="/" class="flex cursor-pointer flex-row space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-pink-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h4 class="font-bold text-gray-500 hover:text-pink-600">
              Dashboard
            </h4>
          </router-link>
        </div>
      </div>
      <!-- About -->
      <div class="flex flex-col px-2 mb-2">
        <div class="p2 hover:bg-pink-200">
          <router-link
            to="/about"
            class="flex cursor-pointer flex-row space-x-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-pink-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
 <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            <h4 class="font-bold text-gray-500 hover:text-pink-600">About</h4>
          </router-link>
        </div>
      </div>
    </div>

    <div class="p-1">
      <button class="bg-pink-700 rounded-full p-2 text-white/90 w-full">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sb_class: false,
    };
  },
  methods: {
    tgl() {
      document.getElementById("sb").classList.toggle("sb-sm");
    },
  },
};
</script>

<style scoped>
.sb-sm {
  width: 70px;
}
.sb-sm a h4 {
  display: none;
}
.sb-sm .sb-title {
  display: none;
}
.sb-sm a {
  margin: 0px 15px;
}
.sb-sm .lbl-tgl {
  margin: 5px 5px;
}
</style>