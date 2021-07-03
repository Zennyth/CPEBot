var aes256 = require('aes256');

const { aesToken } = require('../config');

module.exports = {
    encrypt: (str) => {
        return aes256.encrypt(aesToken, str);
    },
    decrypt: (encryptedStr) => {
        return aes256.decrypt(aesToken, encryptedStr);
    }
}