const Movie = require('../models/movie');
const ValidationError = require('../utils/errors/ValidationError'); // 400
const NotFoundError = require('../utils/errors/NotFoundError'); // 404
const NotAllowedError = require('../utils/errors/NotAllowedError'); // 403

//  Получаем все фильмы  //
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

//  Создаем фильм  //
const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const owner = req.user;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Not correct data'));
      return;
    }
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (movie == null) {
      next(new NotFoundError('Movie with this id not found'));
      return;
    }
    if (movie.owner.toString() !== req.user._id.toString()) {
      next(new NotAllowedError('You can not delete this movie'));
      return;
    }
    await movie.remove();
    res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError('Not correct data'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
