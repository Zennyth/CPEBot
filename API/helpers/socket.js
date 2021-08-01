const studentService = require('../services/studentService');
const gradeService = require("../services/gradeService");

var io = null;

module.exports = {
    initSocket: (server) => {
        io = require('socket.io')(server);

        // Socket
        io.on('connection', (socket) => { 
            console.log(socket.id + " is connected !");
        
            socket.on('login', async (token, recentGrades) => {
                var res = false;
                console.log("Student token : ", token, recentGrades);
                if(token) {
                    const student = await studentService.getByToken(token);
                    res = student != undefined && student != null;
                    if(res) {
                        await studentService.setSocket(student, socket.id);
                        await module.exports.updateClient(student, recentGrades, false);
                    }
                }
                io.to(socket.id).emit("isTokenValid", res);
            });
        });
    },
    updateClient: async (student, recentGrades = 5, hasNewGrades = true) => {
        //console.log("Update : ", student)
        if(io && student.socketstudent) {
            const grades = await gradeService.getAllGradesByModulesSemestersForUser(student.idstudent);
            const newGrades = await gradeService.getRecentGradesByUser(student.idstudent, recentGrades);
            io.to(student.socketstudent).emit("updateClient", {
                newGradesIcon: hasNewGrades,
                grades,
                newGrades
            });
        }
    }
}