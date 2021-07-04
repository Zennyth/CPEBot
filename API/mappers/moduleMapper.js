class ModuleMapper {
    static toDto (module) {
        return module != null ? {
            label: module.lblmodule,
            rank: module.rankmodule,
        } : null;
    }
    static toModel (moduleDto) {
        return {
            idmodules: moduleDto.idmodules,
            lblmodule: moduleDto.label,
            rankmodule: moduleDto.rank,
        }  
    }
}

module.exports = ModuleMapper;