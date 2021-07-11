const { models } = require('../db');
const StudentMapper = require('../mappers/studentMapper'); 
const aes = require('../helpers/aes');
const crypto = require("crypto");
const { userInfo } = require('os');
const sectorService = require("./sectorService");

const { compare, hash } = require("../helpers/hash")
const { create_channel } = require("../bot/bot");

module.exports = {
    listAll: async () => {
        const students = await models.student.findAll();
        return students.map(student => StudentMapper.toDto(student));
    },
    getIdByPseudo: async (pseudo) => {
        return (await models.student.findOne({
            where: {
                pseudostudent: pseudo
            }
        })).idstudent;
    },
    getAllPublicUsers: async () => {
        const students = await models.student.findAll({
            where:{
                ispublic : true
            }
        });
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

        const sector = await sectorService.getByLabel(studentDto.lblsector);
        if(!sector) {
            throw "You need a valid sector to register.";
        }
        studentDto.idsector = sector.idsector;
        studentDto.yearpromotion += "-09-01";


        let studentModel = StudentMapper.toModel(studentDto);
        studentModel.passwordstudent = aes.encrypt(studentModel.passwordstudent);


        // Login in
        studentModel.tokenlogstudent = crypto.randomBytes(20).toString('hex');

        const newStudent = await models.student.create(studentModel);

        // Create channel
        await create_channel(`${studentDto.lblsector.toLowerCase()}-${newStudent.yearpromotion.split('-')[0]}`);

        return {
            successfull: true,
            token: studentModel.tokenlogstudent
        };
    },
    login: async (studentDto) => {
        //console.log('Service / UserDto = ', studentDto);

        const student = await module.exports.getByMail(studentDto.mail);
        if(student === null) {
            throw "Wrong combination.";
        }

        const result = compare(aes.decrypt(student.passwordstudent), studentDto.password);
        if(result) {
            student.tokenlogstudent = crypto.randomBytes(20).toString('hex');
            await student.save();
            return {
                successfull: true,
                token: student.tokenlogstudent
            };
        } else {
            throw "Wrong combination.";
        }
    },
    resetPassword: async (student, payload) => {
        if(payload.newPassword && payload.actualPassword ) {
            const result = compare(aes.decrypt(student.passwordstudent), payload.actualPassword);
            if(result) {
                student.passwordstudent = aes.encrypt(payload.newPassword);
                await student.save();
                return {
                    successfull: true
                };
            } else {
                throw "Your actual password isn't what you sent";
            }
        } else {
            throw "You need both actual and new passwords";
        }
    },
    setSocket: async(student, idSocket) => {
        try {
            student.socketstudent = idSocket;
            await student.save();
            return true;
        } catch {
            return false;
        }
    }
}