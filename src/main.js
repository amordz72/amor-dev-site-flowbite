import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

//  this taillwain css
import "./index.css";
//  this flowbite ui
import "flowbite";

createApp(App)
  .use(router)

  .use(store)
  .mount("#app");
