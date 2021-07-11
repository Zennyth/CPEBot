const studentService = require('../services/studentService');

var io = null;

module.exports = {
    initSocket: (server) => {
        io = require('socket.io')(server);

        // Socket

        io.on('connection', (socket) => { 
            console.log(socket.id + " is connected !");
        
            socket.on('login', async (token) => {
                console.log("Student token : ", token);
                const student = await studentService.getByToken(token);
                const res = !!student;
                if(res) {
                    studentService.setSocket(student, socket.id);
                }
                io.to(socket.id).emit("resLogin", res);
            });
        });
    },
    updateClient: (student) => {
        if(io && student.socketstudent) {
            io.to(student.socketstudent).emit("updateClient", {
                newGrades: true,
            });
        }
    }
}