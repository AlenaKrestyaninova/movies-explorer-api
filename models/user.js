const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (v) => {
      if (validator.isEmail(v)) {
        return true;
      }
      return false;
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
