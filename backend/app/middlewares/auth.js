const jwt = require('jsonwebtoken');

exports.authorization = (req, res, next) => {
  //@ GET TOKEN FROM COOKIES
  const token = req.cookies.token;
  //@ IF NOT TOKEN
  if (!token) {
    return res.status(401).json({ message: 'No Token, authorization denied!' });
  }
  //@ VERIFY TOKEN
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: 'Token is not Valid' });
  }
};
