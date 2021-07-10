const { Sequelize } = require('sequelize');
const { db } = require('./config');
const aes = require('./helpers/aes');

const sequelize = new Sequelize('CPEAPI', db.username, db.password, {
    host: db.uri,
    dialect: 'postgres',
    logging: false
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
    await models.rank.sync({ force: true });
}

const initial = async () => {
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
    });
    
    await models.student.create({
        "yearpromotion": "2020-09-01",
        "idsector": 1,
        "mailstudent": "mathis.figuet@cpe.fr",
        "pseudostudent": "499511666732433408",
        "passwordstudent": aes.encrypt("O45fWIE4")
    }); 
    await models.student.create({
        "yearpromotion": "2020-09-01",
        "idsector": 1,
        "mailstudent": "florent.monnet@cpe.fr",
        "pseudostudent": "nainculé",
        "passwordstudent": aes.encrypt("Nounours38.0"),
        "ispublic": true
    });
}

module.exports = {
    sequelize: sequelize,
    models: models,
    init: async () => {
        await syncModels();
        await initial();
        // sequelize.options.logging = true;
    }
};