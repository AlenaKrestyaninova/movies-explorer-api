const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const movieSchema = new Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: (v) => {
      if (validator.isURL(v)) {
        return true;
      }
      return false;
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: (v) => {
      if (validator.isURL(v)) {
        return true;
      }
      return false;
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: (v) => {
      if (validator.isURL(v)) {
        return true;
      }
      return false;
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
