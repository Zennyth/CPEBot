class GradeMapper {
    static toDto (grade) {
        return grade != null ? {
            idModule : grade.idmodules,
            idStudent : grade.idstudent,
            idSemester : grade.idsemester,
            label: grade.lblgrade,
            mark : grade.numbergrade,
            coeff : grade.coeffgrade,
            type: grade.typegrade,
            rank : grade.rankgrade
        } : null;
    }
    static toModel (gradeDto) {
        return {
            idmodules : gradeDto.idModule,
            idstudent : gradeDto.idStudent,
            idsemester : gradeDto.idSemester,
            lblgrade: gradeDto.lblgrade || gradeDto.label,
            numbergrade : gradeDto.mark,
            coeffgrade : gradeDto.coeff,
            typegrade: gradeDto.type,
            rankgrade : gradeDto.rank
        }  
    }
}

module.exports = GradeMapper;