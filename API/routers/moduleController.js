// promotionController.js - module route module.

const moduleService = require('../services/moduleService');

var express = require('express');
var router = express.Router();


/**
 * Get all modules
 * @route Get /api/module/
 * @group Modules - Operations about modules
 * @returns {Array} 200 
 * @returns {Error}  default - Unexpected error
 */
 router.get('/', function (req, res) {
    moduleService.listAll().then(modules => {
        res.send(modules);
    });
});

/**
 * Add a module
 * @route POST /api/module/
 * @group Modules - Operations about modules
 * @param {string} module.body.required - label of the promotion
 * @returns {boolean} 200 
 * @returns {Error}  default - Unexpected error
 */
 router.post('/', function (req, res) {
    moduleService.add(req.body).then(response => {
        res.send(response);
    });
});


module.exports = router;