import axios from "@/helpers/axios.helper";

export default {
    getAll: async () => {
        const response = await axios.get('/sector');
        if(response.data) {
            return response.data;
        } else {
            return [];
        }
    }
}