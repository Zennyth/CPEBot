const { models } = require('../db'); 

module.exports = {
    signUp: async userDto => {
        console.log('Service / UserDto = ', userDto);

        const newUser = await models.student.create({
            idstudent: 1,
            yearpromotion: Date.now(),
            idsector: 1,
            mailstudent: userDto.mail,
            passwordstudent: userDto.password,
            pseudostudent: userDto.username
        })
    }
}