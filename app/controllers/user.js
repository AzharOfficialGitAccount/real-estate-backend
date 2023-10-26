const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { errorHandler } = require('../utils/error');
const Listing = require('../models/listing');

exports.updateUser = async (req, res, next) => {
  try {
    const { username, email, password, avatar } = req.body;

    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can only update your own account!'));
    }
    const updates = {
      username,
      email,
    };
    if (password) {
      updates.password = bcrypt.hashSync(password, 10);
    }
    if (avatar) {
      updates.avatar = avatar;
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true });
    const { password: pass, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};



exports.deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only delete your own account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

exports.getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, 'User not found!'));
    }
    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
