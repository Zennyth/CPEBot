class ModuleMapper {
    static toDto (module) {
        return {
            label: module.lblmodule
        }
    }
    static toModel (moduleDto) {
        return {
            idmodules: moduleDto.idmodules,
            lblmodule: moduleDto.label
        }  
    }
}

module.exports = ModuleMapper;