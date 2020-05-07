import Vue from "vue";
import VuetifyToast from "vuetify-toast-snackbar";
import { VSnackbar, VBtn, VIcon } from "vuetify/lib";

Vue.component("v-snackbar", VSnackbar);
Vue.component("v-btn", VBtn);
Vue.component("v-icon", VIcon);

Vue.use(VuetifyToast, {
  x: "center",
  y: "top",
});
