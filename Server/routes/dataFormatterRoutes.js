const express = require('express');
const router = express.Router();
const dataFormatterController = require('../controllers/dataFormatterController');

/**
 * @swagger
 * /format/phone_number:
 *   post:
 *     summary: Phone number formatter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successfully subtracted numbers
 *       500:
 *         description: Server error
 */
router.post('/phone_number', dataFormatterController.phoneNumber); //phoneNumberWithoutAuth or phoneNumber

//router.put('/package_details_update', packageDetailsUpdate);

router.get('/get_country_code', dataFormatterController.getCountry);


module.exports = router;
