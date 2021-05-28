//@ DOT ENVIRONMENT VARIABLE
require('dotenv').config({ path: './app/config/.env' });
const UserSchema = require('../models/employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { loginValidations } = require('../validation/validation');

//@ Authenticate User and Get Token
const auth = async (req, res) => {
  //@ VALIDATION
  const { error } = loginValidations(req.body);
  //@ CHECK IF ERROR
  if (error) return res.statut(400).json({ error: error.details[0].message });
  const { email, password } = req.body;
  try {
    //@ CHECKING USER's PREVIOUS EXISTANCE
    const user = await UserSchema.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Acune donnée trovée' });
    //@ PASSWORDS MATCHING
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: 'Email and password doesnot match' });
    }
    //@ RETURNING BACK THE TOKEN
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isAuth: true,
      },
    };
    //@ CREATE TOKEN
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res
      .status(200)
      .cookie('token', token, {
        expire: new Date() * 9999,
        httpOnly: true,
      })
      .json({ isAuth: true, role: user.role });
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
};

//@ ACCESS PRIVATE
const profile = async (req, res) => {
  try {
    const profile = await UserSchema.findById(req.user.id).select('-password');
    res.json({ profile, isAuth: req.user.isAuth });
  } catch (error) {
    console.error(error.message);
    res.status(400).json('Server error');
  }
};

//@ SIGNOUT
const signout = (req, res) => {
  return res
    .status(200)
    .clearCookie('token')
    .json({ message: 'signout', role: '', isAuth: false });
};

module.exports = { auth, signout, profile };
