const { models } = require('../db'); 
const ModuleMapper = require('../mappers/moduleMapper');

module.exports = {
    listAll: async () => {
        const modules = await models.module.findAll();
        return modules.map(module => ModuleMapper.toDto(module));
    },
    add: async (moduleDto) => {
        console.log('Service / ModuleDto = ', moduleDto);

        // Unique constraint
        const alreayExists = await models.module.findOne({ where: { lblmodule: moduleDto.label } });
        if(alreayExists != null) {
            throw "This label is already used by another module.";
        }
        let moduleModel = ModuleMapper.toModel(moduleDto);

        return await models.module.create(moduleModel);
    },
    getByID: async (id) => {
        return models.module.findByPk(id);
    },
}