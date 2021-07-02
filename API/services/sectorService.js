const { models } = require('../db'); 

const sectorMapper = require('../mappers/sectorMapper');

module.exports = {
    listAll: async () => {
        const sectors = await models.sector.findAll();
        return sectors.map(sector => sectorMapper.toDto(sector));
    },
    add: async (sector) => {
        return await models.sector.create({
            lblsector: sector.label
        });
    }
}