import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./store/index";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

const app = createApp(App);

app
  .use(pinia)
  .use(Quasar, quasarUserOptions)
  .use(router);

app.mount("#app");