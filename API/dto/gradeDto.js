/**
 * @typedef GradeDto
 * @property {integer} idModule
 * @property {integer} idStudent
 * @property {integer} idSemester
 * @property {string} label
 * @property {number} mark
 * @property {integer} coeff
 */

 class GradeDto {
    constructor(idModule,idStudent,idSemester,mark,label,coeff) {
        this.idModule = idModule,
        this.idStudent = idStudent,
        this.idSemester = idSemester,
        this.mark = mark,
        this.coeff = coeff
        this.label = label;
    }
}

module.exports = GradeDto;