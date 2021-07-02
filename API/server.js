const express = require('express');
const app = express();
const port = 3000;

const { init, login, getNotes } = require('./helpers/webScrapping');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const backgroundTask = async () => {
  console.log("Background task launched :");

  try {
    await login();
    await getNotes();

    await delay(6000);
  } catch (error) {
      
  }
  //await backgroundTask();
};


init().then(() => {
  backgroundTask();
});

