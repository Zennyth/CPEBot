import axios from "@/helpers/axios.helper";

import store from '@/store';

export default {
    login: async (email, password) => {
        const response = await axios.post('/student/login', {
            mail: email,
            password: password
        });
        if(response && response.data.successfull) {
            axios.defaults.headers['x-access-token'] = response.data.token;
            store.dispatch('login', response.data.token);
            console.log(store.getters.isLoggedIn);
        }
    }
}