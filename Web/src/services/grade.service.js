import axios from "@/helpers/axios.helper";

import store from '@/store';

export default {
    getAll: async () => {
        const response = await axios.get('/grade');
        if(response.data) {
            store.dispatch('saveGrades', response.data);
            return response.data;
        } else {
            return undefined;
        }
    }
}