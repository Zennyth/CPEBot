import router from "@/router";

export default {
    state: () => ({ 
        token: null,
    }),
    mutations: { 
        modifyToken(state, newToken) {
            state.token = newToken;
        }
    },
    actions: { 
        login(context, newToken) {
            context.commit('modifyToken', newToken);
        },
        logout(context) {
            context.commit('modifyToken', null);
            console.log(context.getters.isLoggedIn)
            router.push({name: 'Login'})
        }
    },
    getters: {
        isLoggedIn: state => {
            return state.token != null;
        },
        token: state => {
            return state.token;
        }
    }
};