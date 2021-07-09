var aes256 = require('aes256');
const crypto = require('crypto');

const { aesToken } = require('../config');

module.exports = {
    encrypt: (str) => {
        var iv = crypto.randomBytes(12);

        // random salt
        var salt = crypto.randomBytes(64);

        // derive key: 32 byte key length - in assumption the aesToken is a cryptographic and NOT a password there is no need for
        // a large number of iterations. It may can replaced by HKDF
        var key = crypto.pbkdf2Sync(aesToken, salt, 2145, 32, 'sha512');

        // AES 256 GCM Mode
        var cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

        // encrypt the given text
        var encrypted = Buffer.concat([cipher.update(str, 'utf8'), cipher.final()]);

        // extract the auth tag
        var tag = cipher.getAuthTag();
        
        // generate output
        return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
    },
    decrypt: (encryptedStr) => {
        // base64 decoding
        var bData = new Buffer(encryptedStr, 'base64');

        // convert data to buffers
        var salt = bData.slice(0, 64);
        var iv = bData.slice(64, 76);
        var tag = bData.slice(76, 92);
        var text = bData.slice(92);

        // derive key using; 32 byte key length
        var key = crypto.pbkdf2Sync(aesToken, salt , 2145, 32, 'sha512');

        // AES 256 GCM Mode
        var decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(tag);

        // encrypt the given text
        var decrypted = decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');

        return decrypted;
    }
}