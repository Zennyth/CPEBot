/**
 * @typedef ModuleDto
 * @property {string} label
 * @property {char} rank
 */

 class ModuleDto {
    constructor(label, rank) {
        this.label = label;
        this.rank = rank;
    }
}

module.exports = ModuleDto;