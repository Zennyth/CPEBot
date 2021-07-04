const { models } = require('../db');
const StudentMapper = require('../mappers/studentMapper'); 

const aes = require('../helpers/aes');
const crypto = require("crypto");
const { userInfo } = require('os');

module.exports = {
    listAll: async () => {
        const students = await models.student.findAll();
        return students.map(student => StudentMapper.toDto(student));
    },
    getById: async (id) => {
        return models.student.findByPk(id);
    },
    getByMail: async (mail) => {
        return await models.student.findOne({
            where: {
                mailstudent: mail
            }
        });
    },
    getByToken: async (token) => {
        return await models.student.findOne({
            where: {
                tokenlogstudent: token
            }
        });
    },
    getAllByPromotionAndSector: async (idsector, yearpromotion) => {
        return await models.student.findAll({
            where: {
                idsector: idsector,
                yearpromotion: yearpromotion
            },
            raw: true
        });
    },
    add: async (studentDto) => {
        console.log('Service / StudentDto = ', studentDto);

        // Unique constraint
        const alreayExists = await module.exports.getByMail(studentDto.mail);
        if(alreayExists !== null) {
            //promise.reject("This mail is already used by another student.");
            throw "This mail is already used by another student.";
        }

        let studentModel = StudentMapper.toModel(studentDto);
        studentModel.passwordstudent = aes.encrypt(studentModel.passwordstudent);


        // Login in
        studentModel.tokenlogstudent = crypto.randomBytes(20).toString('hex');

        return await models.student.create(studentModel);
    },
    login: async (studentDto) => {
        console.log('Service / UserDto = ', studentDto);

        const student = await module.exports.getByMail(studentDto.mail);
        console.log(studentDto);
        if(student === null) {
            throw "Wrong combination.";
        }
        if(studentDto.password == aes.decrypt(student.passwordstudent)) {
            student.tokenlogstudent = crypto.randomBytes(20).toString('hex');
            console.log(student);
            await student.save();
            return {
                successfull: true,
                token: student.tokenlogstudent
            };
        } else {
            throw "Wrong combination.";
        }
    }
}