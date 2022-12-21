const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../middlewares/movieValidation');

router.get('/movies', getMovies);

router.post('/movies', validateMovie, createMovie);

router.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = router;
