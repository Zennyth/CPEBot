const express = require('express');
const app = express();
const { port } = require('./config');


// Don't remove !!!
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Import routers
const UserController = require('./routers/UserController');
app.use('api/user', UserController);

// Launch API
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


/*
const { init, login, getNotes } = require('./helpers/webScrapping');

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
*/
