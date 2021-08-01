import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import userModule from './user.store';
import gradeModule from './grade.store';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "MyGrades"
});
 

export default new Vuex.Store({
  modules: {
    userModule: userModule,
    gradeModule: gradeModule
  },
  plugins: [vuexLocal.plugin]
})
