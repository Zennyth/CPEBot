const auth = require("../config");
const { models } = require("../db");

const studentService = require("../services/studentService.js");

const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    if(token && token != "") {
        studentService.getByToken(token).then(student => {
            //console.log("Middleware : ", student);
            if(student !== null) {
                res.locals.student = student;
                next();
            }
            else {
                return res.status(403).send({
                    message: "Unauthorized !"
                });
            }
        });

    } else {
        return res.status(403).send({
            message: "Unauthorized !"
        });
    }
};

const authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;