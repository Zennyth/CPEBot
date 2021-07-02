/* Temporary variables => db, .env */

var current_user = {
    login: "zennyth",
    email: "mathis.figuet@cpe.fr",
    password: "O45fWIE4",
    token: null
}

const logoutUrl = 'https://sso.cpe.fr/cas/logout';
const loginUrl = 'https://sso.cpe.fr/cas/login';
const notesUrl = 'https://oga.cpe.fr/notes.php';


/*
* getBornFromTwoElements(arrayWithIndexObject, arrayToSplit) : array<Semestre>
* return the arrayWithIndexObject with the actual arrayToSplit[bornInf, bornSupp] based on Indexes
*/
const getBornFromTwoElements = async (array, arrayToSplit) => {
    if(array.length == 1) {
        array[0].childElements = arrayToSplit.slice(array[0].index, arrayToSplit.length - 1);
    } else {
        for(var [i, element] of array.entries()) {
            if(i == 0) {
                // First Element
                element.childElements = arrayToSplit.slice(array[0].index, array[1].index - 1);
            } else if(i == array.length - 1) {
                // Last Element
                element.childElements = arrayToSplit.slice(array[array.length - 1].index, arrayToSplit.length - 1);
            } else {
                element.childElements = arrayToSplit.slice(array[i].index, array[parseInt(i)+1].index - 1);
            }
        }
    }
    return array;
}

/*
* getLabelNotesFromSemesters(semesters) : array<string>
* return all the notes label (used to check if there is a new grade)
*/

const getLabelNotesFromSemesters = (semesters) => {
    function reducer(acc, element){
        if(element.note) acc.push(element.label);
        else {
            if(element.modules) element.modules.reduce(reducer, acc);
            else if(element.notes) element.notes.reduce(reducer, acc);
        }
        return acc; 
    }
    return semesters.reduce(reducer, []);
}

/* Functions */

const getNotesFromModules = async (semesters) => {
    for(var [index, semester] of semesters.entries()) {
        for(const [indexModule, module] of semester.modules.entries()) {
            module.notes = [];
            for(const elem of module.childElements) {
                var doms = await elem.$$('.gris');
                if(doms.length == 0) doms = await elem.$$('.blanc');
                if(doms.length > 0) {
                    module.notes.push({
                        label: await doms[0].getText(),
                        type: await doms[1].getText(),
                        coeff: await doms[2].getText(),
                        note: await doms[3].getText()
                    });
                }
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
                    label : await label.getText(),
                    index: index
                });
                break;
            }
        }
    }

    if(parser[0].index > 0) parser.unshift({
        label: 'Project',
        index: 0
    });

    await getBornFromTwoElements(parser, trs);

    return parser;
}

/* Main */

const { remote } = require('webdriverio');

var browser = null;

module.exports =  {
    init: async () => {
        browser = await remote({
            capabilities: {
                browserName: 'chrome'
            },
            logLevel: "error"
        });
    },
    login: async (user = null) => {
        if(user != null) {
            if(user.login != current_user.login) await browser.url(logoutUrl); // Logout before login in
            current_user = user; // In case the user has changed his crendentials
        }

        await browser.url(loginUrl); 

        const username = await browser.$('[name="username"]');
        await username.setValue(current_user.email);
        const password = await browser.$('[name="password"]');
        await password.setValue(current_user.password);
        const submit = await browser.$('[name="submit"]');
        await submit.click();

        const confirmation = await browser.$('.success'); // Check if the crendetials were valid
        if(!confirmation.error) console.log("Login successfull !");
        else {
            await browser.url(logoutUrl);
            throw "Invalid Credentials"; 
        }
    },
    getNotes: async () => {
        await browser.url(notesUrl);

        const semestersLabel = await browser.$$('.semestre');
        const trs = await browser.$$('<tr>');

        const semesters = await getSemesters(trs, semestersLabel);
        await getModulesFromSemesters(semesters);
        await getNotesFromModules(semesters);

        console.log(getLabelNotesFromSemesters(semesters));

        return semesters;
    }
};