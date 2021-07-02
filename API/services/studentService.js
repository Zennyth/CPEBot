const { models } = require('../db'); 

module.exports = {
    add: async userDto => {
        console.log('Service / UserDto = ', userDto);

        const newUser = await models.student.create({
            yearpromotion: userDto.yearpromotion,
            idsector: userDto.idsector,
            mailstudent: userDto.mail,
            passwordstudent: userDto.password,
            pseudostudent: userDto.username
        });
    }
}