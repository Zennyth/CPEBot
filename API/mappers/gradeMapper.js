class GradeMapper {
    static toDto (grade) {
        return {
            idModule : grade.idmodules,
            idStudent : grade.idstudent,
            idSemester : grade.idsemester,
            label: grade.lblgrade,
            mark : grade.numbergrade,
            coeff : grade.coeffgrade
        }
    }
    static toModel (gradeDto) {
        return {
            idmodules : gradeDto.idModule,
            idstudent : gradeDto.idStudent,
            idsemester : gradeDto.idSemester,
            label: gradeDto.lblgrade,
            numbergrade : gradeDto.mark,
            coeffgrade : gradeDto.coeff
        }  
    }
}

module.exports = GradeMapper;