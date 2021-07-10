/*

const { Client, Permissions } = require('discord.js');
const client = new Client();
const config = require('../config');
/*
const tabCmds = require('./commands/botCommands');
const CommandValidators = require('./validators/commandValidators');

const user = {
    promotion: '2021',
    sector: 'IRC'
}

const publicChannels = ['général', 'Salons textuels'];
function getPrivateChannels(cache) {
    return cache.filter(ch => !publicChannels.includes(ch.name));
}

async function createChannel(channelName) {
    const group = client.channels.cache.find(ch => ch.name === publicChannels[1]);
    const guild = group.guild;
    const everyoneRole = guild.roles.everyone;
    const channel = await guild.channels.create(channelName, {
        type: 'text',
        parent: group
    });
    await channel.overwritePermissions([
        {type: 'member', id: client.user.id, allow: [Permissions.FLAGS.VIEW_CHANNEL]},
        {type: 'role', id: everyoneRole.id, deny: [Permissions.FLAGS.VIEW_CHANNEL]},
    ]);
}


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    await createChannel('irc-2022');
    //console.log(client.channels.cache.find(ch => ch.name === 'irc-2021'));
});
//499511666732433408
client.on('message', async msg => {
    if (msg.content.startsWith('/join')){
        const channelName = msg.content.split(' ')[1];
        const channel = client.channels.cache.find(ch => ch.name === channelName);
        getPrivateChannels(client.channels.cache).forEach(ch => ch.permissionOverwrites.get(msg.author.id).delete());
        channel.updateOverwrite(msg.author, {
            'VIEW_CHANNEL': true
        });
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
}*/

const fs = require('fs');
const Discord = require('discord.js');
const { discord } = require('../config');
const { privateChannels, publicChannels } = require('./utils');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// Get commands
const path = './bot/commands';
const commandFolders = fs.readdirSync(path);
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.command.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}
console.log("DISCORD / Commands loaded : \n", client.commands.map(cm => cm.name));

client.on('message', message => {
	if (!message.content.startsWith(discord.prefix) || message.author.bot) return;

	const args = message.content.slice(discord.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    // Args Middleware
    if (command.args && args.length != command.args) {
        if (args.length == 0) return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        else return message.channel.send(`You did provide too much arguments, ${message.author}!`);
    }

    // Cooldown Middleware
    const { cooldowns } = client;
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.log("DISCORD / ", error)
    }
});

client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.get('channel-id-here');
    if (!channel) return;

    await channel.send(`Hey @${member.name}, feel free to use my help : ${discord.prefix}help`);
});

client.on('ready', async () => {
    console.log(`DISCORD / Logged in as ${client.user.tag}!`);
});

client.login(discord.token);

module.exports = {
    create_channel: async function(channelName) {
        console.log(channelName, client.channels.cache.map(ch => ch.name))
        if(client.channels.cache.map(ch => ch.name).includes(channelName) == false) {
            const group = client.channels.cache.find(ch => ch.name === publicChannels[1]);
            const guild = group.guild;
            const everyoneRole = guild.roles.everyone;
            const channel = await guild.channels.create(channelName, {
                type: 'text',
                parent: group
            });
            await channel.overwritePermissions([
                {type: 'member', id: client.user.id, allow: [Discord.Permissions.FLAGS.VIEW_CHANNEL]},
                {type: 'role', id: everyoneRole.id, deny: [Discord.Permissions.FLAGS.VIEW_CHANNEL]},
            ]);
        }
    },
    send_notification_users: async (students) => {
        try {
            for(const student of students) {
                const user = await client.users.fetch(student.pseudostudent, false);
                if(user) user.send(`@${user.username}, a new grade has arrived !`);
            }
            return true;
        } catch (error) {
            return false;
        }
    },
    send_notification_channel: async (channelName) => {
        try {
            const channel = client.channels.cache.find(ch => ch.name === channelName.toLowerCase());
            channel.send(`@here, a new grade has arrived !`);
            return true;
        } catch (error) {
            return false;
        }
    },
}