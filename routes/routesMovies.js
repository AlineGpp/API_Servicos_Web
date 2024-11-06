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
  .get(getMovies);

routesMovies.route("/movies/:id")
.put(updateNoticeMovie)
.delete(verificaJWT,deleteMovies);

module.exports =  routesMovies;
