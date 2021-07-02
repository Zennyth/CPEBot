class ModuleMapper {
    static toDto (module) {
        return {
            label: module.lblmodule
        }
    }
}

module.exports = ModuleMapper;