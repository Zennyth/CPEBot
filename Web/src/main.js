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
const trad = require("@/i18n/translations.json");
const locale = (navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage).slice(0, 2);

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale,
  messages: trad, // set locale messages
  silentTranslationWarn: true,
})

// Socket Setup
import io from 'socket.io-client'
import VueSocketIo from 'vue-socket.io'
Vue.use(new VueSocketIo({
  debug: false,
  connection: io(), //options object is Optional
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
}));

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
  sockets: {
    connect() {
      console.log('socket connected')
    },
    isTokenValid(boolean) {
      console.log("is the token valid : ", boolean);
      if(!boolean) {
        this.$store.dispatch('logout');
      }
    },
    updateClient({ newGradesIcon, grades, newGrades }) {
      //console.log("Update : ", { newGradesIcon, grades, newGrades })
      this.$store.commit("setNewGradesIcon", newGradesIcon);
      this.$store.dispatch("saveGrades", grades);
      this.$store.dispatch("saveNewGrades", newGrades);
    },
  },
  methods: {
    login: function() {
      this.$socket.emit("login", store.getters.token, store.state.userModule.maxNewGrades || 5);
    }
  },
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
