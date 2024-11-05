const { Router } = require("express");
const { verificaJWT } = require("../controllers/securityController");

const {
  getMovies,
  updateNoticeMovie,
deleteMovies
 
} = require("../controllers/moviesController");

const routesMovies = new Router();

routesMovies
  .route("/movies")
  .get(getMovies)
  .put(updateNoticeMovie);

routesMovies.route("/movie/:id").delete(verificaJWT,deleteMovies);

module.exports =  routesMovies;
