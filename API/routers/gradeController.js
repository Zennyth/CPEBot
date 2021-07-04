// promotionController.js - module route module.

const gradeService = require('../services/gradeService');

var express = require('express');
var router = express.Router();


/**
 * Get all marks organised by modules, semesters for a user
 * @route Get /api/grade/
 * @group Grades - Operations about grades
 * @returns {Array} 200 
 * @returns {Error} default - Unexpected error
 */
 router.get('/', function (req, res) {
    const idStudent = 2;
    gradeService.getAllGradesByModulesSemestersForUser(idStudent).then(grades => {
        res.send(grades)
    })
});

module.exports = router;