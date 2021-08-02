const gradeService = require("../../../services/gradeService");
const studentService = require("../../../services/studentService");

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
	description: 'List all grades of a public user and a semester !',
    args: 2,
    aliases: ['grades', 'notes'],
	usage: '[user] [semester]',
    cooldown: 60,
	async execute(message, args, client) {
		const idStudent = await studentService.getIdByPseudo(args[0]);
		let messageToDisplay = "\n";
		if(idStudent) {
			const semesters = await gradeService.getAllGradesByModulesSemestersForUser(idStudent);
			const semester = semesters.filter(semester => semester.id.replace(/\s/g, '') == args[1].replace(/\s/g, ''))[0];
			if(semester) {
				messageToDisplay += semester.id + "\n";
				for(const module of semester.modules){
					messageToDisplay += "\t" + module.label + "\n";
					for (const note of module.notes){
						const split = note.label.split("-")
						messageToDisplay += formatColor("\t" + (split[1] ? split[1] : note.label) + " : " + note.mark + "\n", note.mark >= 10);
					}
				}
			} else {
				messageToDisplay += "This semester doesn't exists please use the [semesters] command.";
			}
		} else {
			messageToDisplay += "This student doesn't exists.";
		}
		message.reply(messageToDisplay);
	},
};