const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config');
const tabCmds = require('./commands/botCommands');
const CommandValidators = require('./validators/commandValidators');

console.log(tabCmds)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (tabCmds.includes(msg.content)){
    }
});


tabCmds[0].validators.forEach(validator => validator("$grades zennyth", {numberOfParamters: 1}));

client.login(config.discordBotToken);