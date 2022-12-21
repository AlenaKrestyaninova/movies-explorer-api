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
const createMovie = (req, res, next) => {
  Movie.create({
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailer: req.body.trailer,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    thumbnail: req.body.thumbnail,
    movieId: req.body.movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Not correct data'));
        return;
      }
      next(err);
    });
};

//  Удаляем фильм  //
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Movie with this id not found'));
        return;
      }
      if (req.user._id !== movie.owner._id.toString()) {
        next(new NotAllowedError('You can not delete this movie'));
        return;
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => { res.send(movie); })
        .catch((err) => { next(err); });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Not correct data'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
