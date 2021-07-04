// promotionController.js - promotion route module.

const promotionService = require('../services/promotionService');

var express = require('express');
var router = express.Router();

/**
 * Get all promotions
 * @route Get /api/promotion/
 * @group Promotions - Operations about promotions
 * @returns {Array} 200 
 * @returns {Error}  default - Unexpected error
 */
router.get('/', function (req, res) {
    promotionService.listAll().then(promotions => {
        res.send(promotions);
    });
});

/**
 * Add a promotion
 * @route POST /api/promotion/
 * @group Promotions - Operations about promotions
 * @param {string} promotion.body.required - year of the promotion
 * @returns {boolean} 200 
 * @returns {Error}  default - Unexpected error
 */
router.post('/', function (req, res) {
    promotionService.add(req.body).then(response => {
        res.send(response);
    });
});

module.exports = router;