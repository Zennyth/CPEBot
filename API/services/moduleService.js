const { models } = require('../db'); 
const ModuleMapper = require('../mappers/moduleMapper');

module.exports = {
    listAll: async () => {
        const modules = await models.module.findAll();
        return modules.map(module => ModuleMapper.toDto(module));
    },
    add: async (module) => {
        return await models.module.create({
            lblmodule: module.label
        });
    },
    getByID: async (id) => {
        return models.module.findByPk(id);
    },
}