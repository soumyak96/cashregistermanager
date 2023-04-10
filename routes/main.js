const express = require('express');
const router = express.Router();

//controller
const { encryptPassword, getNotes } = require('../controllers/main');

//api routes
router.post('/api/v1/encryptPassword', encryptPassword);
router.post('/api/v1/getNotes', getNotes);

module.exports = router;