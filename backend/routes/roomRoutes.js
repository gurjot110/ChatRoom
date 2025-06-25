const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/', roomController.createRoom);
router.get('/:code', roomController.joinRoom);
router.post('/messages', roomController.saveMessage);

module.exports = router;