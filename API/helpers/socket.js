const studentService = require('../services/studentService');
const gradeService = require("../services/gradeService");

var io = null;

module.exports = {
    initSocket: (server) => {
        io = require('socket.io')(server);

        // Socket
        io.on('connection', (socket) => { 
            console.log(socket.id + " is connected !");
        
            socket.on('login', async (token) => {
                var res = false;
                console.log("Student token : ", token);
                if(token) {
                    const student = await studentService.getByToken(token);
                    res = student != undefined && student != null;
                    if(res) {
                        await studentService.setSocket(student, socket.id);
                        await module.exports.updateClient(student);
                    }
                }
                io.to(socket.id).emit("isTokenValid", res);
            });
        });
    },
    updateClient: async (student) => {
        //console.log("Update : ", student)
        if(io && student.socketstudent) {
            const grades = await gradeService.getAllGradesByModulesSemestersForUser(student.idstudent);
            const newGrades = await gradeService.getRecentGradesByUser(student.idstudent, 5);
            io.to(student.socketstudent).emit("updateClient", {
                newGradesIcon: true,
                grades,
                newGrades
            });
        }
    }
}