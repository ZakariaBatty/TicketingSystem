const express = require('express');
const router = express.Router();

const { createTcket, tickets } = require('../controllers/ticket.controller');
const { authorization } = require('../middlewares/auth');
//@ ROUTER POST
router.post('/createTcket', authorization, createTcket);
//@ ROUTER GET
router.get('/tickets', authorization, tickets);
module.exports = router;
