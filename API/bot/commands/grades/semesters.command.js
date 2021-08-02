const gradeService = require("../../../services/gradeService");
const studentService = require("../../../services/studentService");

module.exports = {
	name: 'semesters',
	description: 'List all semesters of a public user !',
    args: 1,
    aliases: ['grades', 'notes'],
	usage: '[user]',
    cooldown: 60,
	// Y a + de 2000 char, besoin d'envoyer en plusieurs messages
	async execute(message, args, client) {
		const idStudent = await studentService.getIdByPseudo(args[0]);
        let messageToDisplay = "\n";
        if(idStudent) {
            const semesters = await gradeService.getAllGradesByModulesSemestersForUser(idStudent);
            messageToDisplay += semesters.map(semester => semester.id.replace(/\s/g, '')).join(" / ");
        } else {
            messageToDisplay += "This student doesn't exists.";
        }
		message.reply(messageToDisplay);
	},
};