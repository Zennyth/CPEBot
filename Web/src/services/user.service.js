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
        }
    },
    signUp: async (student) => {
        try {
            const response = await axios.post('/student/signup', student);
            if(response && response.data) {
                axios.defaults.headers['x-access-token'] = response.data.token;
                store.dispatch('login', response.data.token);
                return true;
            } else return false;   
        } catch (error) {
            return {
                error: error,
            }
        }
    }
}