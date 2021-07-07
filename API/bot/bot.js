const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config');
/*
const tabCmds = require('./commands/botCommands');
const CommandValidators = require('./validators/commandValidators');*/



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
//499511666732433408
/*
client.on('message', msg => {
    if (tabCmds.includes(msg.content)){

    }
});*/


//tabCmds[0].validators.forEach(validator => validator("$grades zennyth", {numberOfParamters: 1}));

client.login(config.discordBotToken);

export default {
    send_notification: (discordId) => {
        try {
            const user = await client.users.fetch(discordId, false)
            user.send(`@${user.username}, a new grade has arrived !`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}