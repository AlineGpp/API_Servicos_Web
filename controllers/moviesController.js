const { getMoviesDB, addPeopleDB, updateNoticeMovieDB, deleteMovieDB, getPeoplePorCodigoDB } = require('../useCases/MoviesUseCase');

const getMovies = async (request, response) => {
    await getMoviesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as pessoas: ' + err
        }));
}

const addPeople = async (request, response) => {
    await addPeopleDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Pessoa criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateNoticeMovie = async (request, response) => {
    const idMovie = request.params.id;  // Obtém o ID do filme dos parâmetros da URL
    const notice = request.body.notice;  // Obtém o comentário do corpo da requisição

    try {
      const data = await updateNoticeMovieDB({ id: idMovie, notice });
      response.status(200).json({
        status: "success",
        message: "Nota atualizada com sucesso",
        objeto: data
      });
    } catch (err) {
      response.status(400).json({
        status: "error",
        message: err.message
      });
    }
  };
  

const deleteMovies = async (request, response) => {
    await deleteMovieDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));   
         
}

const getPeoplePorID = async (request, response) => {
    await getPeoplePorCodigoDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
    getMovies, addPeople, updateNoticeMovie, deleteMovies, getPeoplePorID
}

