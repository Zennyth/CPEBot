const express = require('express');
const app = express();
const { port, refresh } = require('./config');
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize, init } = require('./db');
const socket = require("./helpers/socket");

// Cors
const corsOptions = {
  origin: `http://localhost:${8080}`
};
app.use(cors(corsOptions));

// Serialization to JSON
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const server = require('http').createServer(app);
socket.initSocket(server);

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
          bearerAuth: {
                name: "x-access-token",
                type: 'apiKey',
                scheme: 'bearer',
                in: 'header',
            }
        },
        security: [ { bearerAuth: [] } ],
    },
    basedir: __dirname, //app absolute path
    files: ['./dto/**/*.js', './routers/**/*.js'] //Path to the API handle folder
};
expressSwagger(options);

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
const gradeController = require('./routers/gradeController');
app.use('/api/grade', gradeController);

app.use(express.static(__dirname + '/dist'));
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
})

const { initWebScrapping, checkNewGradesByPromotionAndSector } = require('./helpers/webScrapping');
const { delay } = require("./helpers/utils");

const backgroundTask = async () => {
  console.log("Background task launched :");
  try {
    await checkNewGradesByPromotionAndSector();
  } catch (error) {
    console.log("Background Task / Error : ", error);
  }

  await delay(refresh * 1000);
  await backgroundTask();
};

// Launch API
server.listen(port, async () => {
  console.log(`App / Example app listening at http://localhost:${port}`);

  // is DB working ?
  try {
    await sequelize.authenticate();
    await init();
    console.log('DB / Connection has been established successfully.');

    
    // Web Scrapping running in background  
    initWebScrapping().then(() => {
      backgroundTask();
    });
  } catch (error) {
    console.error('DB / Unable to connect to the database:', error);
  }
});