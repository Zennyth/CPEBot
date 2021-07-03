const { models } = require('../db'); 
const GradeMapper = require('../mappers/gradeMapper');

module.exports = {
    getAllGradesByUser : async (id) => {
        const grades = await models.grade.findAll({ where: { idstudent: id } });
        console.log("test",grades.map(grade => GradeMapper.toDto(grade)));
        return grades.map(grade => GradeMapper.toDto(grade));
    }
}