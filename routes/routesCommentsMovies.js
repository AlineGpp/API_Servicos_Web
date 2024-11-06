const { Router } = require('express');
const { addCommentsMovies ,getMovieComments} = require('../controllers/commentsMoviesController');
const routesCommentsMovies = new Router();

routesCommentsMovies.route('/comments/:id')
    .post(addCommentsMovies);


routesCommentsMovies.route('/movies/:id/comments')
    .get(getMovieComments);

module.exports =  routesCommentsMovies ;