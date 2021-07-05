import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


// Import Styles
import GlassMorphism from "./plugins/glassmorphism-kit";
Vue.use(GlassMorphism);

// Import Translations
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
// Ready translated locale messages
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})


import Notifications from 'vue-notification'
import velocity      from 'velocity-animate'
Vue.use(Notifications, { velocity })

import {
  ValidationObserver,
  ValidationProvider,
  extend
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')