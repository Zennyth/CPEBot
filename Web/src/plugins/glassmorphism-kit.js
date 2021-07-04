/*import "@/styles/variables.scss";
import '/node_modules/bootstrap/dist/css/bootstrap.css';
import '/node_modules/bootstrap-vue/dist/bootstrap-vue.css';*/
import "@/styles/app.scss";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

export default {
    install(Vue) {
        Vue.use(BootstrapVue);
        Vue.use(IconsPlugin);
    }
};