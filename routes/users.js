const router = require('express').Router();
const {
  getCurrentUser, updateProfile,
} = require('../controllers/users');
const { validateProfileUpdate } = require('../middlewares/userValidation');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', validateProfileUpdate, updateProfile);

module.exports = router;
