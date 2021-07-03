const { Sequelize } = require('sequelize');
const { db } = require('./config');
const aes = require('./helpers/aes');

const sequelize = new Sequelize('CPEAPI', db.username, db.password, {
    host: db.uri,
    dialect: 'postgres'
});

var initModels = require("./models/init-models");

var models = initModels(sequelize);

const syncModels = async () => {
    await models.module.sync({ force: true });
    await models.promotion.sync({ force: true });
    await models.semester.sync({ force: true });
    await models.sector.sync({ force: true });
    await models.student.sync({ force: true });
    await models.grade.sync({ force: true });
}

const initial = () => {
    models.promotion.create({
        "yearpromotion": "2020-09-01"
    });
    models.sector.create({
        "lblsector": "IRC"
    });
    
    models.semester.create({
        idsemester: 5
    });
    models.semester.create({
        idsemester: 6
    });
    models.student.create({
        "yearpromotion": "2020-09-01",
        "idsector": 1,
        "mailstudent": "mathis.figuet@cpe.fr",
        "pseudostudent": "zennyth",
        "passwordstudent": aes.encrypt("test")
    });
}

module.exports = {
    sequelize: sequelize,
    models: models,
    init: async () => {
        await syncModels();
        initial();
    }
};