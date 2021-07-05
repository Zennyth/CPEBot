/**
 * @typedef RankDto
 * @property {integer} idModule
 * @property {integer} idStudent
 * @property {integer} idSemester
 * @property {char} mark
 */
 
 class RankDto {
    constructor(idModule,idStudent,idSemester,rank) {
        this.idModule = idModule;
        this.idStudent = idStudent;
        this.idSemester = idSemester;
        this.rank = rank;
    }
}

module.exports = RankDto;