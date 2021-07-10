const studentService = require('../services/studentService');
const gradeService = require('../services/gradeService');
const rankService = require('../services/rankService');
const moduleService = require('../services/moduleService');
const semesterService = require('../services/semesterService');
const sectorService = require('../services/sectorService');

const { sequelize } = require('../db');
const { QueryTypes } = require('sequelize');

const SemesterMapper = require('../mappers/semesterMapper');

const aes = require('../helpers/aes');

const { send_notification_channel, send_notification_users } = require("../bot/bot");


/* Temporary variables => db, .env */

var current_user = null;

const logoutUrl = 'https://sso.cpe.fr/cas/logout';
const loginUrl = 'https://sso.cpe.fr/cas/login';
const gradesUrl = 'https://oga.cpe.fr/notes.php';


/*
* getBornFromTwoElements(arrayWithIndexObject, arrayToSplit) : array<Semestre>
* return the arrayWithIndexObject with the actual arrayToSplit[bornInf, bornSupp] based on Indexes
*/
const getBornFromTwoElements = async (array, arrayToSplit) => {
    if(array.length == 1) {
        array[0].childElements = arrayToSplit.slice(array[0].index, arrayToSplit.length);
    } else {
        for(var [i, element] of array.entries()) {
            if(i == 0) {
                // First Element
                element.childElements = arrayToSplit.slice(array[0].index, array[1].index);
            } else if(i == array.length - 1) {
                // Last Element
                element.childElements = arrayToSplit.slice(array[array.length - 1].index, arrayToSplit.length);
            } else {
                element.childElements = arrayToSplit.slice(array[i].index, array[parseInt(i)+1].index);
            }
        }
    }
    return array;
}

/*
* getLabelgradesFromSemesters(semesters) : array<string>
* return all the grades label (used to check if there is a new grade)
*/

const getLabelGradesFromSemesters = (semesters) => {
    function reducer(acc, element){
        if(element.mark) acc.push(element.label);
        else {
            if(element.modules) element.modules.reduce(reducer, acc);
            else if(element.grades) element.grades.reduce(reducer, acc);
        }
        return acc; 
    }
    return semesters.reduce(reducer, []);
}

/* Functions */

const getGradesFromModules = async (semesters) => {
    for(var [index, semester] of semesters.entries()) {
        for(const [indexModule, module] of semester.modules.entries()) {
            module.grades = [];
            for(const elem of module.childElements) {
                var doms = await elem.$$('.gris');
                if(doms.length == 0) doms = await elem.$$('.blanc');
                if(doms.length > 0) {
                    module.grades.push({
                        label: await doms[0].getText(),
                        type: await doms[1].getText(),
                        coeff: parseFloat((await doms[2].getText()).replace(' %', '')),
                        mark: await doms[3].getText()
                    });
                }
            }
        }
        var i = 0;
        for(const [index, elem] of semester.childElements.entries()) {
            const rankElem = await elem.$$('.average');
            if(rankElem.length > 0) {
                semester.modules[i].rank = (await rankElem[0].getText()).slice(-1);;
                i++;
            }
        }
    }
}


const getModulesFromSemesters = async (semesters) => {
    for(var [index, semester] of semesters.entries()) {
        semester.modules = [];

        for(const [indexChild, child] of semester.childElements.entries()) {
            const elem = await child.$('<th>');
            if(!elem.error) {  
                semester.modules.push({
                    index: indexChild,
                    label: await elem.getText()
                });
            }
        }

        if(semester.modules.length == 0) {
            semester.modules.push({
                index: 0,
                label: semester.label
            });
        }

        await getBornFromTwoElements(semester.modules, semester.childElements);
    }
}

const getSemesters = async (trs, semesters) => {
    var parser = [];
    
    for(let semester of semesters) {
        const trParent = await semester.parentElement();
        const parentHtml = await trParent.getHTML();
        
        for(const [index, tr] of trs.entries()) {
            const trHmtl = await tr.getHTML();
            if(trHmtl == parentHtml) {
                const label = await tr.$('.semestre');
                parser.push({
                    id : await label.getText(),
                    index: index
                });
                // test with break
            }
        }
    }

    if(parser[0].index > 0) parser.unshift({
        id: 'Projet',
        index: 0
    });
    
    await getBornFromTwoElements(parser, trs);

    return parser;
}

const getGrades = async () => {
    await browser.url(gradesUrl);

    const semestersLabel = await browser.$$('.semestre');
    const trs = await browser.$$('<tr>');

    const semesters = await getSemesters(trs, semestersLabel);
    await getModulesFromSemesters(semesters);
    await getGradesFromModules(semesters);

    return semesters; 
};

const setNestedSemestersModulesGrades = async (nestedSemesters) => {
    for(const nestedSemester of nestedSemesters) {
        // Semester
        var modelSemester = null;
        try {
            modelSemester = await semesterService.add(nestedSemester);
        } catch (error) {
            modelSemester = {
                idsemester: nestedSemester.id
            };
        }

        for(const nestedModule of nestedSemester.modules) {
            // Module
            var modelModule = null;
            try {
                modelModule = await moduleService.add(nestedModule);
            } catch (error) {
                modelModule = await moduleService.getByLabel(nestedModule.label);
            }

            for(var nestedGrade of nestedModule.grades) {
                // Grade
                nestedGrade.idStudent = current_user.idstudent;
                nestedGrade.idSemester = modelSemester.idsemester;
                nestedGrade.idModule = modelModule.idmodules;
                try {
                    modelGrade = await gradeService.add(nestedGrade);
                } catch (error) {
                    modelGrade = await gradeService.getByPK(nestedGrade.idSemester, nestedGrade.idStudent, nestedGrade.idModule, nestedGrade.label);
                }
            }

            let newRank = {
                idStudent: current_user.idstudent,
                idSemester: modelSemester.idsemester,
                idModule: modelModule.idmodules
            };
            
            if (nestedModule.rank)
            {
                newRank.rank = nestedModule.rank;
            }
            else {
                newRank.rank = '';
            }

            try {
                rankGrade = await rankService.add(newRank);

            }
            catch(error) {
                rankGrade = await rankService.getByPK(newRank.idSemester, newRank.idStudent, newRank.idModule);
            }
            
        }
    }
};

const checkNewGrades = async (student = null) => {
    await module.exports.login(student);

    const currentGradesLabel = getLabelGradesFromSemesters(await gradeService.getAllGradesByUser(current_user.idstudent));
    //console.log("WebScrapping / checkNewGrades (current grades label): ", currentGradesLabel.length);

    const webScrappedGrades = await getGrades();
    const webScrappedGradesLabel = getLabelGradesFromSemesters(webScrappedGrades);
    //console.log("WebScrapping / checkNewGrades (webscrapped grades label): ", webScrappedGradesLabel.length);

    const newGradesLabel = webScrappedGradesLabel.filter(webScrappedGrade => !currentGradesLabel.includes(webScrappedGrade));
    //console.log("WebScrapping / checkNewGrades (new grades label): ", newGradesLabel.length);

    if(newGradesLabel.length > 0) {
        await setNestedSemestersModulesGrades(webScrappedGrades);
        return true;
    } else {
        return false;
    }
};

/* Main */

const { remote } = require('webdriverio');

var browser = null;

module.exports =  {
    checkNewGradesByUser: checkNewGrades,
    initWebScrapping: async () => {
        current_user = await studentService.getByMail("florent.monnet@cpe.fr");
        current_user = current_user.dataValues;
        browser = await remote({
            capabilities: {
                browserName: 'chrome'
            },
            logLevel: "error",
        });
    },
    checkNewGradesByPromotionAndSector: async () => {
        const combinations = await sequelize.query("SELECT * FROM sector, promotion", { type: QueryTypes.SELECT });
        const channelsWithNewGrades = [];
        //console.log("WebScrapping / checkNewGradesByPromotionAndSector : (promotions and sectors)", combinations);
        for(const combination of combinations) {
            const students = await studentService.getAllByPromotionAndSector(combination.idsector, combination.yearpromotion);
            const studentLength = students.length;
            const studentsWithNewGrades = [];
            if(students.length > 0) {
                const firstCheck = students.shift();
                if((await checkNewGrades(firstCheck))) {
                    //console.log("WS / ", firstCheck);
                    studentsWithNewGrades.push(firstCheck);
                    for(const student of students) {
                        if(await checkNewGrades(student)) studentsWithNewGrades.push(student);
                    }
                    /* Set Notifications ON (Test purpose Off)
                    if(studentsWithNewGrades.length > studentLength * .5) {
                        send_notification_channel(`${combination.lblsector.toLowerCase()}-${firstCheck.yearpromotion.split('-')[0]}`);
                    } else {
                        send_notification_users(studentsWithNewGrades);
                    }*/
                }
            }
        }
    },
    login: async (user = null, dto = false) => {
        if(user != null) {
            if(user.mailstudent != current_user.mailstudent) {
                await browser.url(logoutUrl); // Logout before login in
                await browser.deleteCookies();
                await browser.reloadSession();
            }
            current_user = user; // In case the user has changed his crendentials
        }
    
        //console.log(current_user);
    
        await browser.url(loginUrl); 
    
        const username = await browser.$('[name="username"]');
        await username.setValue(current_user.mailstudent);
        const password = await browser.$('[name="password"]');
        await password.setValue(!dto ? aes.decrypt(current_user.passwordstudent) : current_user.passwordstudent);
        const submit = await browser.$('[name="submit"]');
        await submit.click();
        
        const confirmation = await browser.$$('.success'); // Check if the crendetials were valid
        if(confirmation.length > 0) console.log("Login successfull !");
        else {
            await browser.url(logoutUrl);
            throw "Invalid Credentials"; 
        }
    },
};