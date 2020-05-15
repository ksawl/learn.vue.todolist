/* eslint-disable quotes */
/* eslint-disable semi */

import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import App from "./App.vue";
import Vue from "vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
