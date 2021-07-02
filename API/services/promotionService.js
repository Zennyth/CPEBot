const { models } = require('../db'); 

module.exports = {
    listAll: async () => {
        return await models.promotion.findAll();
    },
    add: async (promotion) => {
        return await models.promotion.create({
            yearpromotion: new Date(Date.UTC(promotion.year, 8, 1)).toUTCString()
        });
    }
}