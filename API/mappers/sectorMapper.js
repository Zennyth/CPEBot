class SectorMapper {
    static toDto (sector) {
        return {
            label: sector.lblsector
        }
    }
}

module.exports = SectorMapper;