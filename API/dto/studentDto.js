/**
 * @typedef StudentDto
 * @property {int} idStudent
 * @property {Date} yearpromotion
 * @property {int} idsector
 * @property {string} mail
 * @property {string} pseudo
 */

class StudentDto {
    constructor(idStudent, yearpromotion, idsector, mailstudent, pseudostudent) {
        this.idStudent = idStudent;
        this.yearpromotion = yearpromotion;
        this.idsector = idsector;
        this.mail = mailstudent;
        this.pseudo = pseudostudent;
    }
}

module.exports = StudentDto;