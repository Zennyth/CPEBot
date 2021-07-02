const { Sequelize } = require('sequelize');
const { db } = require('./config');

const sequelize = new Sequelize('CPEAPI', db.username, db.password, {
    host: db.uri,
    dialect: 'postgres'
});

var initModels = require("./models/init-models");

var models = initModels(sequelize);

module.exports = {
    sequelize: sequelize,
    models: models
};