// semesterController.js - semester route module.

const semesterService = require('../services/semesterService');

var express = require('express');
var router = express.Router();

/**
 * Get all semesters
 * @route Get /api/semester/
 * @group Semesters - Operations about semesters
 * @returns {Array} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/', function (req, res) {
    semesterService.listAll().then(semesters => {
        res.send(semesters);
    });
});

/**
 * Add a semester
 * @route POST /api/semester/
 * @group Semesters - Operations about semesters
 * @param {string} semester.body.required - year of the semester
 * @returns {boolean} 200 
 * @returns {Error}  default - Unexpected error
 */
router.post('/', function (req, res) {
    semesterService.add(req.body).then(response => {
        res.send(response);
    });
});

module.exports = router;