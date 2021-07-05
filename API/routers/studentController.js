// studentController.js - student route module.

const studentService = require('../services/studentService');
const authJwt = require("../middlewares/authJwtMiddleware");
const ws = require("../helpers/webScrapping")
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
 * Get all students
 * @route Get /api/student/
 * @group Students - Operations about students
 * @returns {Array} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/', [authJwt.verifyToken], function (req, res) {
  studentService.getAllPublicUsers().then(response => {
    res.send(response);
  });
});

/**
 * Get student by mail
 * @route Get /api/student/{mail}
 * @group Students - Operations about students
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
 * @route POST /api/student/signup
 * @group Students - Operations about students
 * @param {string} student.body.required - student to add
 * @returns {boolean} 200 
 * @returns {Error}  default - Unexpected error
 */
router.post('/signup', async function (req, res) {
  /*test {
    "yearpromotion": "2020-09-01",
    "lblsector": "IRC",
    "mail": "mathis.figuet@cpe.fr",
    "pseudo": "zennyth",
    "password": "test"
  }*/
  
  try {
    const response = await studentService.add(req.body);
    res.send(response);
  } catch (err) {
    res.status(500);
    res.json({ error: err });
  }
});

/**
 * Login as a student
 * @route POST /api/student/login
 * @group Students - Operations about students
 * @param {string} student.body.required - student to be looges as
 * @returns {boolean} 200 
 * @returns {Error}  default - Unexpected error
 */
 router.post('/login', async function (req, res) {
  /*test {
    "mail": "mathis.figuet@cpe.fr",
    "password": "password"
  }*/
  
  try {
    res.send(await studentService.login(req.body));
  } catch (err) {
    res.status(500);
    res.json({ error: err || "Unkwnokwn Error"});
  }
});

module.exports = router;