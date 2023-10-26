const jwt = require('jsonwebtoken');
const { errorHandler } = require('./error');
const User = require('../models/user');

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, 'Unauthorized'));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));
    req.user = user;
    next();
  });
};

exports.checkUserRef = async (req, res, next) => {

  try {
    const { userRef } = req.body;

    const checkUser = await User.findOne({ _id: userRef });
    if (!checkUser) {
      return next(errorHandler(404, 'UserRef wrong'));
    }
  } catch (error) {
    console.log(error);
  }
  next();
}
