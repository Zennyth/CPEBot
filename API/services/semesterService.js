const { models } = require('../db'); 

const semesterMapper = require('../mappers/semesterMapper');

module.exports = {
    listAll: async () => {
        const semesters = await models.semester.findAll();
        return semesters.map(semester => semesterMapper.toDto(semester));
    },
    add: async (semester) => {
        return await models.semester.create({
            idsemester: semester.id
        });
    }
}