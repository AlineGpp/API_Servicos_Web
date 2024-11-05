const {Router} = require('express');
const routesMovies = require('./routesMovies');
const routesCommentMovies = require('./routesCommentsMovies');
const {login } = require('../controllers/securityController');
const routes = new Router();

routes.post('/login', login);
routes.use(routesMovies);
routes.use(routesCommentMovies);


module.exports = routes;