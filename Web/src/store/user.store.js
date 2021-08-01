import router from "@/router";

export default {
    state: () => ({ 
        token: null,
        discord: '',
        notification: '',
        maxNewGrades: null
    }),
    mutations: { 
        modifyToken(state, newToken) {
            state.token = newToken;
        },
        modifyDiscord(state, newDiscord) {
            state.discord = newDiscord;
        },
        modifyNotification(state, newNotification) {
            state.notification = newNotification;
        },
        modifyMaxNewGrades(state, number) {
            state.maxNewGrades = number;
        }
    },
    actions: { 
        login(context, payload) {
            context.commit('modifyToken', payload.token);
            context.commit('modifyDiscord', payload.discord);
            context.commit('modifyNotification', payload.notification);
        },
        logout(context) {
            context.commit('modifyToken', null);
            context.commit('modifyDiscord', '');
            context.commit('modifyNotification', '');
            router.push({name: 'Login'});
        }
    },
    getters: {
        isLoggedIn: state => {
            return state.token != null;
        },
        token: state => {
            return state.token;
        },
        hasNotificationsConfigured: state => {
            return state.discord == '' || state.notification == ''; 
        },
        hasMaxGradesConfigured: state => {
            return state.maxNewGrades != undefined && Number.isInteger(state.maxNewGrades);
        }
    }
};