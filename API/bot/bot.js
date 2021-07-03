const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config');
const tabCmds = require('./commands/botCommands');
const CommandValidators = require('./validators/commandsValidators');

console.log(tabCmds)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (tabCmds.includes(msg.content)){
    }
});

console.log(CommandValidators[0]);

client.login(config.discordBotToken);

