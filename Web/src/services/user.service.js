import axios from "@/helpers/axios.helper";

import store from '@/store';

import bcrypt from 'bcryptjs';

export default {
    login: async (email, password) => {
        const salt = bcrypt.genSaltSync(10);
        const response = await axios.post('/student/login', {
            mail: email,
            password: bcrypt.hashSync(password, salt)
        });
        if(response && response.data.successfull) {
            axios.defaults.headers['x-access-token'] = response.data.token;
            store.dispatch('login', response.data);
        }
    },
    signUp: async (student) => {
        try {
            const response = await axios.post('/student/signup', student);
            if(response && response.data) {
                axios.defaults.headers['x-access-token'] = response.data.token;
                store.dispatch('login', response.data);
                return true;
            } else return false;   
        } catch (error) {
            return {
                error: error,
            }
        }
    },
    resetPassword: async (form) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            const payload = {
                newPassword: form.newPassword,
                actualPassword: bcrypt.hashSync(form.actualPassword, salt)
            }
            const response = await axios.post('/student/resetPassword', payload);
            return response && response.data; 
        } catch (error) {
            return {
                error: error,
            }
        }
    },
    changeNotifications: async(payload) => {
        try {
            const response = await axios.post('/student/changeNotifications', payload);
            return response && response.data; 
        } catch (error) {
            return {
                error
            }
        }
    }
}