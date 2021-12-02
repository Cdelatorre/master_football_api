const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller')

router.post('/create', gameController.create)
router.get('/summary', gameController.summary)
router.delete('/delete/:id', gameController.delete)

module.exports = router;
