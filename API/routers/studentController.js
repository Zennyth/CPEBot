// studentController.js - student route module.

const studentService = require('../services/studentService');

var express = require('express');
var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
  res.send('user home page');
})

// About page route.
router.get('/about', function (req, res) {
  res.send('About this user');
})

module.exports = router;