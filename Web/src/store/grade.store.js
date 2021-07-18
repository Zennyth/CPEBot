export default {
    state: () => ({ 
        grades: [],
        newGrades: [],
        newGradesIcon: true
    }),
    mutations: { 
        modifyGrades(state, grades) {
            state.grades = grades || [];
        },
        modifyNewGrades(state, grades) {
          state.newGrades = grades || [];
        },
        setNewGradesIcon(state, newGradesIcon) {
          state.newGradesIcon = newGradesIcon;
        }
    },
    actions: { 
        saveGrades(context, newGrades) {
          newGrades.forEach(semester => {
                semester.modules.forEach(module => {
                  const subjects = [];
                  module.notes.forEach(note => {
                    const matter = note.label.split('-').map(lbl => lbl.trim());
                    const isSubjectExist = subjects.find(subject => subject.label == matter[0]);
                    note.label = matter[1];
                    if(isSubjectExist) {
                      isSubjectExist.notes.push(note);
                    } else {
                      subjects.push({
                        label: matter[0],
                        notes: [note]
                      });
                    }
                  });
                  module.subjects = subjects;
                });
            });
            context.commit('modifyGrades', newGrades);
        },
        saveNewGrades(context, newGrades) {
          context.commit('modifyNewGrades', newGrades);
        }
    },
    getters: {
        hasGrades: state => {
          return Array.isArray(state.grades) && state.grades.length > 0;
        },
        grades: state => {
          return state.grades;
        },
        newGrades: state => {
          return state.newGrades;
        },
        newGradesIcon: state => {
          return state.newGradesIcon;
        }
    }
};