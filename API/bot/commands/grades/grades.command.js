const gradeService = require("../../../services/gradeService");

module.exports = {
	name: 'grades',
	description: 'JList all grades of a public user !',
    args: 1,
    aliases: ['grades'],
	usage: '[user]',
    cooldown: 60,
	async execute(message, args, client) {
		const grades = await gradeService.getAllGradesByUser(1);
		message.reply(grades);
		console.log("Commands / ", grades);
	},
};