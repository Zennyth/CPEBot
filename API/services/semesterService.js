const { models } = require('../db'); 

const SemesterMapper = require('../mappers/semesterMapper');

module.exports = {
    listAll: async () => {
        const semesters = await models.semester.findAll();
        return semesters.map(semester => SemesterMapper.toDto(semester));
    },
    add: async (semesterDto) => {
        // Unique constraint
        const alreayExists = await module.exports.getByID(semesterDto.id);
        if(alreayExists != null) {
            throw "This id is already used by another semester.";
        }
        
        return await models.semester.create(SemesterMapper.toModel(semesterDto));
    },
    getByID: async (id) => {
        return  SemesterMapper.toDto(await models.semester.findByPk(id)); 
    },
}