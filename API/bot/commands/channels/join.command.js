const { privateChannels } = require('../../utils');

module.exports = {
	name: 'join',
	description: 'Join a channel based on your promotion and sector !',
    args: 1,
    aliases: ['grades', 'notifications'],
	usage: '[name of your sector]-[year of your promotion]',
    cooldown: 60,
	execute(message, args, client) {
		const channelName = args[0];
		const channel = client.channels.cache.find(ch => ch.name === channelName);
		
		// Check if channel exists
		if(channel) {
			privateChannels(client.channels.cache).forEach(ch => {
				const permissions = ch.permissionOverwrites.get(message.author.id);
				if(permissions) permissions.delete();
			});
			channel.updateOverwrite(message.author, {
				'VIEW_CHANNEL': true
			});
			message.reply('You were allowed to join the channel you requested but denied your previous ones !')
		} else {
			message.reply('it seems like this channel doesn\'t exists, feel free to create an account to our web application !');
		}
	},
};