import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import setupInterceptors from "./services/setupInterceptors";
import ElementPlus from "element-plus";

setupInterceptors(store);

createApp(App).use(store).use(router).use(Toast).use(ElementPlus).mount("#app");
