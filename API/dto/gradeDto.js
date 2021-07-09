/**
 * @typedef GradeDto
 * @property {integer} idModule
 * @property {integer} idStudent
 * @property {integer} idSemester
 * @property {string} type
 * @property {string} label
 * @property {number} mark
 * @property {integer} coeff
 */
 
 class GradeDto {
    constructor(idModule,idStudent,idSemester,mark,label,coeff,type,updatedAt) {
        this.idModule = idModule;
        this.idStudent = idStudent;
        this.idSemester = idSemester;
        this.type = type;
        this.mark = mark;
        this.coeff = coeff;
        this.label = label;
        this.timestamp = updatedAt;
    }
}

module.exports = GradeDto;