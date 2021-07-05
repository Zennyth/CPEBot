class RankMapper {
    static toDto (rank) {
        return rank != null ? {
            idModule : rank.idmodules,
            idStudent : rank.idstudent,
            idSemester : rank.idsemester,
            rank : rank.lblrank
        } : null;
    }
    static toModel (rankDto) {
        return {
            idmodules : rankDto.idModule,
            idstudent : rankDto.idStudent,
            idsemester : rankDto.idSemester,
            lblrank: rankDto.rank
        }  
    }
}

module.exports = RankMapper;