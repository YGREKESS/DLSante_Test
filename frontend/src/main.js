import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSignOutAlt,
  faCar,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from "@fortawesome/vue-fontawesome";
import router from "./router";
import axios from "axios";
import VueToastr from "vue-toastr";

library.add(faSignOutAlt, faCar, faCheck);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueToastr, {
  defaultPosition: "toast-bottom-left",
  defaultTimeout: 2000,
  defaultStyle: {
    "font-family": "Poppins, sans-serif",
    "z-index": "100",
    opacity: "1",
  },
});

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
