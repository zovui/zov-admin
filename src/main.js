import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Zov from "zov";
Vue.use(Zov);

import "@css/index.scss";
import "zov/lib/zov.min.css";

Vue.config.productionTip = false;

/* eslint-disable */
if (process.env.NODE_ENV !== "production") require("@mock");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
