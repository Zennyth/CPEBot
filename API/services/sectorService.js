const { models } = require('../db'); 

module.exports = {
    listAll: async () => {
        const sectors = [];
        return await models.sector.findAll();
    },
    add: async (sector) => {
        return await models.sector.create({
            lblsector: sector.label
        });
    }
}