const { models } = require('../db'); 

module.exports = {
    listAll: async () => {
        return await models.module.findAll();
    },
    add: async (module) => {
        return await models.module.create({
            lblmodule: module.label
        });
    }
}