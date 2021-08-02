const studentService = require('../services/studentService');
const gradeService = require('../services/gradeService');
const rankService = require('../services/rankService');
const moduleService = require('../services/moduleService');
const semesterService = require('../services/semesterService');
const sectorService = require('../services/sectorService');

const socket = require("./socket");
const notifications = require('./notifications');
const aes = require('./aes');

const { sequelize } = require('../db');
const { QueryTypes } = require('sequelize');

const SemesterMapper = require('../mappers/semesterMapper');

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
                var doms = $(elem).find('.gris');
                if(doms.length == 0) doms = $(elem).find('.blanc');
                if(doms.length > 0) {
                    module.grades.push({
                        label: doms[0].children[0].data,
                        type: doms[1].children[0].data,
                        coeff: parseFloat((doms[2].children[0].data).replace(' %', '')),
                        mark:  doms[3].children[0].data
                    });
                }                
            }
        }
        var i = 0;
        semester.childElements.each(function(index, elem) {
            const rankElem = $(elem).find('.average');
            if(rankElem.length > 0) {
                semester.modules[i].rank = rankElem[0].children[0].data.slice(-1);;
                i++;
            }
        });
    }
}


const getModulesFromSemesters = async (semesters) => {
    for(var [index, semester] of semesters.entries()) {
        semester.modules = [];

        semester.childElements.each(function(indexChild, child) {
            const elem = $(child).find('th');
            if(elem.length > 0) {
                semester.modules.push({
                    index: indexChild,
                    label: elem[0].children[0].data
                });
            }
        })

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
        const trParent = semester.parent;
        const htmlParent = $.html(trParent);
        
        trs.each(async function(index, tr) {
            const html = $.html(tr);
            if(html == htmlParent) {
                parser.push({
                    id : tr.children[0].children[0].data,
                    index
                });
            }
        });
    }

    if(parser[0].index > 0) parser.unshift({
        id: 'Projet',
        index: 0
    });
    
    await getBornFromTwoElements(parser, trs);

    return parser;
}

const getGrades = async () => {
    const loginService = await instance.get("https://sso.cpe.fr/cas/login?service=https%3A%2F%2Foga.cpe.fr%2Fnotes.php");
    $ = cheerio.load(loginService.data);

    const semestersLabel = $('.semestre');
    const trs = $('tr');

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

const checkNewGrades = async (student = null, dto = false) => {
    await module.exports.login(student, dto);

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

const { instance, resetCookies } = require('./axios.js');
const cheerio = require('cheerio');
var $ = null;

module.exports =  {
    checkNewGradesByUser: checkNewGrades,
    initWebScrapping: async () => {
        current_user = await studentService.getByMail("florent.monnet@cpe.fr");
        current_user = current_user?.dataValues || null;
    },
    checkNewGradesByPromotionAndSector: async () => {
        const combinations = await sequelize.query("SELECT * FROM sector, promotion", { type: QueryTypes.SELECT });
        const channelsWithNewGrades = [];
        // console.log("WebScrapping / checkNewGradesByPromotionAndSector : (promotions and sectors)", combinations);
        for(const combination of combinations) {
            const students = await studentService.getAllByPromotionAndSector(combination.idsector, combination.yearpromotion);
            const studentLength = students.length;
            const studentsWithNewGrades = [];
            if(students.length > 0) {
                // console.log("WS Check Combination / ", combination);
                const firstCheck = students.shift();
                // console.log("WS Check / ", firstCheck);
                if((await checkNewGrades(firstCheck))) {
                    // console.log("WS Check / ", firstCheck);
                    studentsWithNewGrades.push(firstCheck);
                    await socket.updateClient(firstCheck);
                    for(const student of students) {
                        if(await checkNewGrades(student)) {
                            studentsWithNewGrades.push(student);
                            await socket.updateClient(student);
                        }
                    }
                    notifications.sendToStudents(studentsWithNewGrades);

                    // Set Notifications ON (Test purpose Off)
                    if(studentsWithNewGrades.length > studentLength * .5) {
                        send_notification_channel(`${combination.lblsector.toLowerCase()}-${firstCheck.yearpromotion.split('-')[0]}`);
                    } else {
                        send_notification_users(studentsWithNewGrades);
                    }
                }
            }
        }
    },
    login: async (user = null, dto = false) => {
        if(user != null) {
            if(user.mailstudent != current_user?.mailstudent) resetCookies();
            current_user = current_user?.dataValues || user;
        }

        resetCookies();
        const response = await instance.get(loginUrl);

        const $ = cheerio.load(response.data);
        const lt = $('input[name=lt]')[0].attribs.value;
        const execution = $('input[name=execution]')[0].attribs.value;

        const login = await instance.post(loginUrl, `username=${current_user.mailstudent}&password=${!dto ? aes.decrypt(current_user.passwordstudent) : current_user.passwordstudent}&lt=${lt}&execution=${execution}&_eventId=submit&submit=LOGIN`);

        const isLoggedIn = cheerio.load(login.data);

        if(isLoggedIn('.success')[0]) console.log("Login successfull !");
        else {
            resetCookies();
            throw "Invalid Credentials"; 
        }
    },
};