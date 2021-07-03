const { models } = require('../db');
const StudentMapper = require('../mappers/studentMapper'); 

const aes = require('../helpers/aes');

module.exports = {
    listAll: async () => {
        const students = await models.student.findAll();
        return students.map(student => StudentMapper.toDto(student));
    },
    getById: async (id) => {
        return models.student.findByPk(id);
    },
    getByMail: async (mail) => {
        return await models.student.findAll({
            where: {
                mailstudent: mail
            }
        });
    },
    add: async (studentDto) => {
        console.log('Service / UserDto = ', studentDto);

        // Unique constraint
        const alreayExists = await module.exports.getByMail(studentDto.mail);
        if(alreayExists.length > 0) {
            //promise.reject("This mail is already used by another student.");
            throw "This mail is already used by another student.";
        }

        let studentModel = StudentMapper.toModel(studentDto);
        studentModel.passwordstudent = aes.encrypt(studentModel.passwordstudent);

        return await models.student.create(studentModel);
    }
}