// studentController.js - student route module.

const studentService = require('../services/studentService');

var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  res.send('user home page');
})

/**
 * Add a student
 * @route POST /api/student/
 * @group semester - Operations about students
 * @param {string} student.body.required - student to add
 * @returns {boolean} 200 
 * @returns {Error}  default - Unexpected error
 */
router.post('/', function (req, res) {
  studentService.add(req.body).then(response => {
    res.send(response);
  });
});

module.exports = router;