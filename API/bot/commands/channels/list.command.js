const { privateChannels } = require('../../utils');

module.exports = {
	name: 'list',
	description: 'List all private channels named after each combinations of promotion-sector',
    args: 0,
    aliases: ['channels'],
	usage: '',
    cooldown: 30,
	execute(message, args, client) {
        const channels = privateChannels(client.channels.cache).map(channel => `${channel.name}\n`);
        message.reply(`Here are all channels : \n${channels}`)
	},
};