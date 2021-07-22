const { remote } = require('webdriverio');

var browser = null;

module.exports = {
    init: async function() {
        try {
            browser = await remote({
                capabilities: {
                    browserName: 'chrome'
                },
                logLevel: "error",
            });
        } catch (err) {
            console.log("WS Init / ", err);
        }
        console.log("yo")
    },
    getUrl: async function(url) {
        try {
            browser.url(url);
        } catch (err) {
            console.log("WS Url / ", err);
        }
    }
}