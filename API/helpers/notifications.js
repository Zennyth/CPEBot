const { pushover } = require('../config/index');
const Push = require( 'pushover-notifications' );
 
const p = new Push( pushover );

const messageToStudent = (student) => {
    return {
        message: `Hey ${student.pseudostudent}, check out your new grades !`,	// required
        title: 'MyGrades',
        sound: 'magic',
        device: 'devicename',
        priority: 1,
        user: student.notificationtoken
    }
}

module.exports = {
    test: function() {
        const user = 'ukb2wxqhd4nf1s8sa6kfcjn55taeyw';
        const msg = {
            message: 'Hey, check out your new grades !',	// required
            title: 'MyGrades',
            sound: 'magic',
            device: 'devicename',
            priority: 1
        };
        msg.user = user;
        p.send( msg, function( err, result ) {
            if ( err ) {
                throw err
            }
            
            console.log( result )
        })
    },
    sendToStudents: async function(students) {
        students.forEach(student => {
            if(student.notificationtoken) {
                const msg = messageToStudent(student);
                p.send(msg, function(err, status) {
                    if ( err ) {
                        console.log( err );
                    }
                    console.log("Notifications / Attempt to student : ", student.mailstudent, status );
                });
            }
        });
    }
}