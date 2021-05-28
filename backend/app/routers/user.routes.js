const express = require('express');
const router = express.Router();

//@ REQUIRE FROM CONTROLLERES
const {
  createUser,
  addDepartment,
  assignTicket,
  assign,
  changeEtatTicket,
  histiryTicket,
  departements
} = require('../controllers/user.controller');
const { auth, signout, profile } = require('../controllers/auth');

//@ REQUIRE FROM MIDDLEWARE
const { authorization } = require('../middlewares/auth');

//@ROUTER  POST
router.post('/createUser', createUser);
router.post('/addDepartment', addDepartment);
router.post('/login', auth);
router.post('/assignTicket', assignTicket);
//@ ROUTER GET
router.get('/profile', authorization, profile);
router.get('/logout', signout);
router.get('/getAssign', authorization, assign);
router.get('/histiryTicket', histiryTicket);
router.get('/departements', departements);
//@ ROUTER PUT
router.put('/changeEtatTicket', changeEtatTicket);
module.exports = router;
