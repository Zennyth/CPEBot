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


/* Start */

const { remote } = require('webdriverio');

var browser = null;

module.exports =  {
    init: async () => {
        browser = await remote({
            capabilities: {
                browserName: 'chrome'
            }
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

        const semesters = await browser.$$('.semestre');
        console.log("Semestres Found : ", semesters);

        const trs = await browser.$$('<tr>');
        
        for(let semester of semesters) {
            console.log("Semestre : ", semester);
            const trParent = await semester.parentElement();
            console.log("Parent :", trParent);
            console.log("Index : ", trs.find(tr => trParent.getHTML() == tr.getHTML()));
        }
    }
};