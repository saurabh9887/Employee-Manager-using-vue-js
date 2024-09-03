import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.mount("#app");

// Main color: #0077b6
// Second main color: #0096c7
