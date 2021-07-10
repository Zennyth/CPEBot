const bcrypt = require('bcryptjs');

const { saltRounds } = require('../config');

module.exports = {
    hash: (str) => {
        const salt = bcrypt.genSaltSync(parseInt(saltRounds))
        return bcrypt.hashSync(str, salt);
    },
    compare: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    }
}