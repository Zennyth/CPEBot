const { models } = require('../db'); 
const RankMapper = require('../mappers/rankMapper');

module.exports = {
    getByPK: async (idsemester, idstudent, idmodule) => {
        return RankMapper.toDto(await models.rank.findOne({
            where: {
                idsemester: idsemester,
                idstudent: idstudent,
                idmodules: idmodule
            }
        })); 
    },
    add: async (rankDto) => {
        // Unique constraint
        const alreayExists = await module.exports.getByPK(rankDto.idSemester, rankDto.idStudent, rankDto.idModule);
        if(alreayExists != null) {
            throw "This rank already has the pk";
        }
        let rankModel = RankMapper.toModel(rankDto);
        return await models.rank.create(rankModel);
    },
    getAllRanksByUser: async (id) => {
        const ranks = await models.rank.findAll({ where: { idstudent: id } });
        return ranks.map(rank => RankMapper.toDto(rank));
    },
}