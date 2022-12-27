const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../middlewares/movieValidation');

router.get('/', getMovies);

router.post('/', validateMovie, createMovie);

router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
