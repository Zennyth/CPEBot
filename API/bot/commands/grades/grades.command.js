const gradeService = require("../../../services/gradeService");

module.exports = {
	name: 'grades',
	description: 'JList all grades of a public user !',
    args: 1,
    aliases: ['grades'],
	usage: '[user]',
    cooldown: 60,
	execute(message, args, client) {
        console.log("azeazeaze");
	},
};