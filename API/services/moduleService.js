const { models } = require('../db'); 
const ModuleMapper = require('../mappers/moduleMapper');

module.exports = {
    listAll: async () => {
        const modules = await models.module.findAll();
        return modules.map(module => ModuleMapper.toDto(module));
    },
    add: async (moduleDto) => {
        // Unique constraint
        const alreayExists = await module.exports.getByLabel(moduleDto.label);
        if(alreayExists != null) {
            throw "This label is already used by another module.";
        }
        let moduleModel = ModuleMapper.toModel(moduleDto);

        return await models.module.create(moduleModel);
    },
    getByID: async (id) => {
        return  ModuleMapper.toDto(await models.module.findByPk(id));
    },
    getByLabel: async (label) => {
        return await models.module.findOne({ where: { lblmodule: label }, raw: true });
    },
}