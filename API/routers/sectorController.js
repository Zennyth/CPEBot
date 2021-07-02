// sectorController.js - sector route module.

const sectorService = require('../services/sectorService');

var express = require('express');
var router = express.Router();

/**
 * Get all sectors
 * @route Get /api/sector/
 * @group sector - Operations about sectors
 * @returns {Array} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/', function (req, res) {
    sectorService.listAll().then(sectors => {
        res.send(sectors);
    });
});

/**
 * Add a sector
 * @route POST /api/sector/
 * @group sector - Operations about sectors
 * @param {string} sector.body.required - year of the sector
 * @returns {boolean} 200 
 * @returns {Error}  default - Unexpected error
 */
router.post('/', function (req, res) {
    sectorService.add(req.body).then(response => {
        res.send(response);
    });
});

module.exports = router;