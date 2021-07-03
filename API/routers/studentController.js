// studentController.js - student route module.

const studentService = require('../services/studentService');

var express = require('express');
var router = express.Router();

/**
 * Get all students
 * @route Get /api/student/
 * @group student - Operations about students
 * @returns {Array} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/', function (req, res) {
  studentService.listAll().then(response => {
    res.send(response);
  });
});

/**
 * Get student by mail
 * @route Get /api/student/{mail}
 * @group student - Operations about students
 * @param {string} mail.path.required - mail
 * @returns {Array} 200 
 * @returns {Error}  default - Unexpected error
 */
 router.get('/:mail', function (req, res) {
  studentService.getByMail(req.params.mail).then(response => {
    res.send(response);
  });
});

/**
 * Add a student
 * @route POST /api/student/
 * @group student - Operations about students
 * @param {string} student.body.required - student to add
 * @returns {boolean} 200 
 * @returns {Error}  default - Unexpected error
 */
router.post('/', async function (req, res) {
  /*test {
    "yearpromotion": "2020-09-01",
    "idsector": 1,
    "mail": "mathis.figuet@cpe.fr",
    "pseudo": "zennyth",
    "password": "test"
  }*/
  
  try {
    res.send(await studentService.add(req.body));
  } catch (err) {
    res.status(500);
    res.json({ error: err });
  }
});

module.exports = router;