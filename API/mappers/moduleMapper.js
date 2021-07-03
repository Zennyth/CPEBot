class ModuleMapper {
    static toDto (module) {
        return module != null ? {
            label: module.lblmodule
        } : null;
    }
    static toModel (moduleDto) {
        return {
            idmodules: moduleDto.idmodules,
            lblmodule: moduleDto.label
        }  
    }
}

module.exports = ModuleMapper;