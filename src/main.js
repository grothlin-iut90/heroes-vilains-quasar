import { createApp } from "vue";
import { Quasar } from "quasar";
import quasarLang from 'quasar/lang/en-US.js';
import quasarIconSet from 'quasar/icon-set/material-icons.js';
import App from "./App.vue";
import router from './router';
import pinia from './stores';

const app = createApp(App);

app.use(pinia)
app.use(router);
app.use(Quasar, {
    lang: quasarLang,
    iconSet: quasarIconSet
})

app.mount('#q-app')
