class studentMapper {
    static toDto (student) {
        return {
            idStudent: student.idStudent,
            yearpromotion: student.yearpromotion,
            idsector: student.idsector,
            mail: student.mailstudent,
            pseudo: student.pseudostudent,
            notification: student.notificationtoken,
            discord: student.discordtoken,
        }
    }

    static toModel (studentDto) {
        return {
            idStudent: studentDto.idStudent,
            yearpromotion: studentDto.yearpromotion,
            idsector: studentDto.idsector,
            mailstudent: studentDto.mail,
            pseudostudent: studentDto.pseudo,
            passwordstudent: studentDto.password,
            notificationtoken: studentDto.notification,
            discordtoken: studentDto.discord,
        }  
    }
}

module.exports = studentMapper;