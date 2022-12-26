import { createApp } from "vue";
import App from "@/App";

import store from "@/store/pkmnStore";
import vuetify from "./plugins/vuetify";

import { loadFonts } from "./plugins/webfontloader";
import { createHead, VueHeadMixin } from "@vueuse/head";

import "@/assets/fonts/essentiarum/stylesheet.css";
import "@/assets/fonts/thraexsans/stylesheet.css";

const app = createApp(App).use(store);
const head = createHead();

loadFonts("Montserrat", "Raleway");

app.use(store);
app.use(vuetify);
app.mixin(VueHeadMixin);
app.use(head);

app.mount("#app");
