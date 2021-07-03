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
}

const initial = async () => {
    await models.promotion.create({
        "yearpromotion": "2020-09-01"
    });
    await models.sector.create({
        "lblsector": "IRC"
    });
    await models.module.create({
        "idmodule":"Systèmes et Réseaux - Architecture des Réseaux Locaux & Les bases de la sécurité informatique"
    })
    await models.module.create({
        "idmodule":"Informatique - Programmation Orientée Objet en Java & Bases de données & Techniques et Langages du web"
    })
    await models.semester.create({
        idsemester: "SEMESTRE 5"
    });
    await models.student.create({
        "yearpromotion": "2020-09-01",
        "idsector": 1,
        "mailstudent": "mathis.figuet@cpe.fr",
        "pseudostudent": "zennyth",
        "passwordstudent": aes.encrypt("O45fWIE4")
    });
    await models.grade.create({
        "idmodules": 1,
        "idstudent": 1,
        "idsemester":"SEMESTRE 5",
        "lblgrade": "1INTRO RES - Introduction Réseaux DS",
        "typegrade": "Devoir surveillé écrit",
        "numbergrade": 9,
        "coeffgrade":30
    });
    await models.grade.create({
        "idmodules": 2,
        "idstudent": 1,
        "idsemester":"SEMESTRE 5",
        "lblgrade": "1TLW - Techniques et Langages du Web Contrôle continu",
        "typegrade": "Notation Travaux pratiques",
        "numbergrade": 15,
        "coeffgrade":16.5
    });
}

module.exports = {
    sequelize: sequelize,
    models: models,
    init: async () => {
        await syncModels();
        await initial();
        //sequelize.options.logging = true;
    }
};