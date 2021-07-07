const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config');
/*
const tabCmds = require('./commands/botCommands');
const CommandValidators = require('./validators/commandValidators');*/



client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    //console.log(client.channels.cache.find(ch => ch.name === 'irc-2021'));
});
//499511666732433408
client.on('message', async msg => {
    if (msg.content.startsWith('/join')){
        const channelName = msg.content.split(' ')[1];
        const channel = client.channels.cache.find(ch => ch.name === channelName);
        channel.overwritePermissions([
            {
                id: msg.author.id,
                allow: ['VIEW_CHANNEL'],
            },
        ], 'Needed to change permissions');
        const link = await channel.createInvite(maxUses=1,unique=true);
        const user = await client.users.fetch(msg.author.id, false)
        await user.send(`https://discord.gg/${link.code}`);
    }
});


//tabCmds[0].validators.forEach(validator => validator("$grades zennyth", {numberOfParamters: 1}));

client.login(config.discordBotToken);

module.exports = {
    send_notification: async (discordId) => {
        try {
            const user = await client.users.fetch(discordId, false)
            user.send(`@${user.username}, a new grade has arrived !`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    send_notification_channel: async () => {
        try {
            const channel = client.channels.cache.find(ch => ch.name === 'irc-2021');
            channel.send(`@here, a new grade has arrived !`);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}