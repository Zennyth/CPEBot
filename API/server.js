const express = require('express');
const app = express();
const { port } = require('./config');

const { sequelize } = require('./db');

// Serialization to JSON
app.use(express.json());

// Use Swagger !
const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routers/**/*.js', './dto/**/*.js'] //Path to the API handle folder
};
expressSwagger(options);

// Don't remove !!!
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Import routers
const studentController = require('./routers/studentController');
app.use('/api/student', studentController);
const promotionController = require('./routers/promotionController');
app.use('/api/promotion', promotionController);
const sectorController = require('./routers/sectorController');
app.use('/api/sector', sectorController);
const moduleController = require('./routers/moduleController');
app.use('/api/module', moduleController);
const semesterController = require('./routers/semesterController');
app.use('/api/semester', semesterController);

// Launch API
app.listen(port, async () => {
  console.log(`App / Example app listening at http://localhost:${port}`);

  // is DB working ?
  try {
    await sequelize.authenticate();
    console.log('DB / Connection has been established successfully.');
  } catch (error) {
    console.error('DB / Unable to connect to the database:', error);
  }
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
