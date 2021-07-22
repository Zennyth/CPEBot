const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const port = 3000;

const browser = require("./browser");


app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send({
        status: "On",
        message: "The WebScraping server is running."
    });
});

app.get('/test', async function (req, res) {
    let message = "";

    try {
        await browser.getUrl("https://google.com");
        message = "Done";
    } catch (err) {
        console.log("WS Browser / ", err);
        message = err;
    }


    res.send({
        status: "On",
        message
    });
});

app.listen(port, async () => {
    console.log(`App / Example app listening at http://localhost:${port}`);

    await browser.init();

    console.log("ok")
});