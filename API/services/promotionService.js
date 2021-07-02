const { models } = require('../db');

const promotionMapper = require('../mappers/promotionMapper');

module.exports = {
    listAll: async () => {
        const promotions = await models.promotion.findAll();
        return promotions.map(promotion => promotionMapper.toDto(promotion));
    },
    add: async (promotion) => {
        return await models.promotion.create({
            yearpromotion: new Date(Date.UTC(promotion.year, 8, 1)).toUTCString()
        });
    }
}