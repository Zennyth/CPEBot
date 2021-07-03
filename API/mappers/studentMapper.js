class studentMapper {
    static toDto (student) {
        return {
            idStudent: student.idStudent,
            yearpromotion: student.yearpromotion,
            idsector: student.idsector,
            mail: student.mailstudent,
            pseudo: student.pseudostudent
        }
    }

    static toModel (studentDto) {
        return {
            idStudent: studentDto.idStudent,
            yearpromotion: studentDto.yearpromotion,
            idsector: studentDto.idsector,
            mailstudent: studentDto.mail,
            pseudostudent: studentDto.pseudo,
            passwordstudent: studentDto.password
        }  
    }
}

module.exports = studentMapper;