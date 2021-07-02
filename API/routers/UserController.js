// user.js - user route module.

const UserService = require('../services/UserService');

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