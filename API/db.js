const { Sequelize } = require('sequelize');
const { db } = require('./config');
const aes = require('./helpers/aes');

const mode = "prod"; // ou prod

console.log(db)

const sequelize = new Sequelize(db.name, db.username, db.password, {
    host: db.uri,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});
var initModels = require("./models/init-models");

var models = initModels(sequelize);

const syncModelsAlter = async () => {
    await models.module.sync({ alter: true });
    await models.promotion.sync({ alter: true });
    await models.semester.sync({ alter: true });
    await models.sector.sync({ alter: true });
    await models.student.sync({ alter: true });
    await models.grade.sync({ alter: true });
    await models.rank.sync({ alter: true });
}

const syncModelsForce = async () => {
    await models.module.sync({ force: true });
    await models.promotion.sync({ force: true });
    await models.semester.sync({ force: true });
    await models.sector.sync({ force: true });
    await models.student.sync({ force: true });
    await models.grade.sync({ force: true });
    await models.rank.sync({ force: true });
}

const initial = async () => {
    /*
    await models.promotion.create({
        "yearpromotion": "2020-09-01"
    });
    await models.promotion.create({
        "yearpromotion": "2021-09-01"
    });
    await models.sector.create({
        "lblsector": "IRC"
    });
    await models.sector.create({
        "lblsector": "ICS"
    });
    await models.sector.create({
        "lblsector": "CGP"
    });
    await models.sector.create({
        "lblsector": "ETI"
    });
    await models.semester.create({
        idsemester: "SEMESTRE 5"
    });*/
}

module.exports = {
    sequelize: sequelize,
    models: models,
    init: async () => {
        if(mode == "dev") {
            await syncModelsForce();
            await initial();
            sequelize.options.logging = true;
        } else {
            //await initial();
            await syncModelsAlter();
        }
    }
};