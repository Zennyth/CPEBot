const { models } = require('../db'); 
const GradeMapper = require('../mappers/gradeMapper');

const { reducer } = require('../helpers/utils');

const moduleService = require('./moduleService');
const grade = require('../models/grade');
const rankService = require('./rankService');

module.exports = {
    getByPK: async (idsemester, idstudent, idmodule, lblgrade) => {
        return GradeMapper.toDto(await models.grade.findOne({
            where: {
                idsemester: idsemester,
                idstudent: idstudent,
                idmodules: idmodule,
                lblgrade: lblgrade
            }
        })); 
    },
    add: async (gradeDto) => {
        // Unique constraint
        const alreayExists = await module.exports.getByPK(gradeDto.idSemester, gradeDto.idStudent, gradeDto.idModule, gradeDto.label);
        if(alreayExists != null) {
            throw "This grade already has the pk";
        }
        let gradeModel = GradeMapper.toModel(gradeDto);
        return await models.grade.create(gradeModel);
    },
    getAllGradesByUser: async (id) => {
        const grades = await models.grade.findAll({ where: { idstudent: id } });
        return grades.map(grade => GradeMapper.toDto(grade));
    },
    getRecentGradesByUser: async(id,nbGrade) =>{
        const grades = await models.grade.findAll({ 
            where: { 
                idstudent: id 
            },
            order:[['updatedAt','DESC']],
            limit: parseInt(nbGrade)
        });
        return grades.map(grade => GradeMapper.toDto(grade));
    },
    getAllGradesByModulesSemestersForUser: async (id) => {
        const grades = await module.exports.getAllGradesByUser(id);
        const nestedSemesters = [];
        for(const grade of grades) {
            // Semestres
            var semester = nestedSemesters.find(nestedSemester => nestedSemester.id == grade.idSemester);
            if(!semester) {
                semester = {
                    id: grade.idSemester,
                    modules: []
                }
                nestedSemesters.push(semester)
            }

            // Modules
            var moduleN = semester.modules.find(moduleNested => moduleNested.id == grade.idModule);
            if(!moduleN) {
                let moduleDto = await moduleService.getByID(grade.idModule);
                let rankDto = await rankService.getByPK(grade.idSemester,grade.idStudent,grade.idModule)
                moduleN = {
                    id: grade.idModule,
                    label: moduleDto.label,
                    notes: [],
                    rank: rankDto.rank
                }
                semester.modules.push(moduleN)
            }

            // Notes
            var note = moduleN.notes.find(noteNested => noteNested.idmodules == grade.idModule && noteNested.idsemester == grade.idSemester && noteNested.lblgrade == grade.label);
            if(!note) moduleN.notes.push(grade);
        }
        return nestedSemesters;
    }
}