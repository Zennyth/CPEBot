const gradeService = require("../../../services/gradeService");
const studentService = require("../../../Services/studentService");

function formatColor(message, bool){
	var value = undefined;
	if (bool){
		value = "+";
	}else{
		value = "-";
	}
	color = {
		"start": "```diff\n" + value,
		"end": "\n```"
	}
	return color['start'] + message + color['end'];
} 

module.exports = {
	name: 'grades',
	description: 'JList all grades of a public user !',
    args: 1,
    aliases: ['grades'],
	usage: '[user]',
    cooldown: 60,
	// Y a + de 2000 car, besoin d'envoyer en plusieurs messages
	async execute(message, args, client) {
		const idStudent = await studentService.getIdByPseudo(args[0]);
		const semesters = await gradeService.getAllGradesByModulesSemestersForUser(idStudent);
		let messageToDisplay = "\n";
		for (const semester of semesters){
			messageToDisplay += semester.id + "\n";
			for(const module of semester.modules){
				messageToDisplay += "\t" + module.label + "\n";
				for (const note of module.notes){
					messageToDisplay += "\t" + note.label + " : " + note.mark + "\n";
				}
			}
		}
		console.log(messageToDisplay);
		message.reply(messageToDisplay);
	},
};