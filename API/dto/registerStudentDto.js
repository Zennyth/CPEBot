/**
 * @typedef RegisterStudentDto
 * @property {int} idStudent
 * @property {Date} yearpromotion
 * @property {string} lblsector
 * @property {string} mail
 * @property {string} pseudo
 */

 class StudentDto {
    constructor(idStudent, yearpromotion, lblsector, mailstudent, pseudostudent) {
        this.idStudent = idStudent;
        this.yearpromotion = yearpromotion;
        this.lblsector = lblsector;
        this.mail = mailstudent;
        this.pseudo = pseudostudent;
    }
}

module.exports = StudentDto;