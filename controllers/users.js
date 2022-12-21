const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError'); // 404
const ValidationError = require('../utils/errors/ValidationError'); // 400
const AuthError = require('../utils/errors/AuthError'); // 401
const UserExistError = require('../utils/errors/UserExistError'); // 409

//  Создаем пользователя  //
const createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      next(new UserExistError('Пользователь с таким email уже зарегистрирован'));
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        password: hashPassword,
        name,
      });
      const {
        name: userName, email: userEmail,
      } = newUser;
      res.status(200).send({
        user: {
          name: userName, email: userEmail,
        },
      });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Not correct data'));
      return;
    }
    next(err);
  }
};

//  Получаем текущего пользователя  //
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id).orFail(new NotFoundError('User with this id not found'))
    .then((user) => {
      if (!user) {
        return next(new AuthError('Not correct data'));
      }
      return res.send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Not correct data'));
      }
      return next(err);
    });
};

//  Обновляем профиль  //
const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('User with this id not found'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new ValidationError('Not correct data'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError('Not correct data'));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  updateProfile,
};
