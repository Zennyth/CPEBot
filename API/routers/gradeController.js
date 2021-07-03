// promotionController.js - module route module.

const gradeService = require('../services/gradeService');

var express = require('express');
var router = express.Router();


/**
 * Get all grades for a user 
 * @route Get /api/grade/
 * @group Grades - Operations about grades
 * @returns {Array} 200 
 * @returns {Error}  default - Unexpected error
 */
 router.get('/', function (req, res) {
    const idStudent = 1
    gradeService.getAllGradesByUser(idStudent).then(grades => {
        res.send(grades)
    })
});

module.exports = router;