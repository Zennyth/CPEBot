// promotionController.js - module route module.

const gradeService = require('../services/gradeService');
const authJwt = require("../middlewares/authJwtMiddleware");

var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});  


/**
 * Get all marks organised by modules, semesters for a user
 * @route Get /api/grade/
 * @group Grades - Operations about grades
 * @returns {Array} 200 
 * @returns {Error} default - Unexpected error
 */
 router.get('/', [authJwt.verifyToken], function (req, res) {
    if(res.locals.student) {
        gradeService.getAllGradesByModulesSemestersForUser(res.locals.student.idstudent).then(grades => {
            res.send(grades);
        })
    } else {
        res.status(500);
        res.json({ error: "You must be logged in."});
    }
});

/**
 * Get all marks organised by modules, semesters for a user
 * @route Get /api/grade/recent/{nbGrades}
 * @group Grades - Operations about grades
 * @param {integer} nbGrades.path.required - nbGrades
 * @returns {Array} 200 
 * @returns {Error} default - Unexpected error
 */
router.get('/recent/:nbGrades', [authJwt.verifyToken], function (req, res) {  
    if(res.locals.student) {
        gradeService.getRecentGradesByUser(res.locals.student.idstudent,req.params.nbGrades).then(grades => {
            res.send(grades);
        })
    } else {
        res.status(500);
        res.json({ error: "You must be logged in."});
    }
});


module.exports = router;