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