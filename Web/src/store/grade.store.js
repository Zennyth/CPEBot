export default {
    state: () => ({ 
        grades: [],
    }),
    mutations: { 
        modifyGrades(state, newGrades) {
            state.grades = newGrades || [];
        }
    },
    actions: { 
        saveGrades(context, newGrades) {
            context.commit('modifyGrades', newGrades);
        }
    },
    getters: {
        hasGrades: state => {
            return Array.isArray(state.grades) && state.grades.length > 0;
        },
        grades: state => {
            return state.grades;
        }
    }
};