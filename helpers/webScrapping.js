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


/* Functions */

const getBornFromTwoElements = async (array, arrayToSplit) => {
    const results = [];

    for(var [i, element] of array.entries()) {
        if(i == 0) {
            // First Element
            element.modules = arrayToSplit.splice(array[0].index, array[1].index - 1);
        } else if(i == array.length - 1) {
            // Last Element
            console.log(array[array.length - 1].index, arrayToSplit.length );
            element.modules = arrayToSplit.splice(array[array.length - 1].index, arrayToSplit.length - 1);
        } else {
            element.modules = arrayToSplit.splice(array[i].index, array[parseInt(i)+1].index - 1);
        }
    }

    return array;
}

const getModulesFromSemesters = async (semesters) => {
    for(var [index, semester] of semesters.entries()) {
        const modules = [];
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

    console.log(trs.length)

    const indexes = await getBornFromTwoElements(parser, trs);
    console.log("Indexes : ", indexes);

    return parser;
}

/* Start */

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
        console.log(semesters);
    }
};