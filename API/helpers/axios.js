require('ssl-root-cas');

const https = require('https');
const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

const agent = new https.Agent({
    requestCert: true,
    rejectUnauthorized: false
});

const instance = axios.create({
    jar: new tough.CookieJar(),
    httpsAgent: agent,
    withCredentials: true
})

axiosCookieJarSupport(instance);
instance.defaults.jar = new tough.CookieJar();

module.exports = {
    instance,
    resetCookies: function() {
        instance.defaults.jar = new tough.CookieJar();
    }
}