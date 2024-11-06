const {addCommentsMoviesDB,getMovieCommentsByIdDB} = require('../useCases/CommentsMovies');

const getMovieComments = async (request,response) =>{
    await getMovieCommentsByIdDB(parseInt(request.params.id))
    .then(data => response.status(200).json(data))
    .catch (err => response.status(500).json(
        {
            status:'error', 
            message: 'Erro ao consultar a  People Program: ' + err
        }
    ));

}

const addCommentsMovies = async (request, response) => {
    const idMovie = request.params.id;  // Obtém o ID do filme dos parâmetros da URL
    const comment = request.body.comment;  // Obtém o comentário do corpo da requisição

    // Chama a função do banco de dados passando o ID do filme e o comentário
    await addCommentsMoviesDB({ movie_id: idMovie, comment })
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Comentário inserido com sucesso',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao inserir comentário: ' + err
        }));
};


const deleteCommentsMovies = async (request,response) => {
    await deletePeopleProgramDB(parseInt(request.params.idMovie),parseInt(request.params.idComment))
    .then(data => response.status(200).json({
        status:'success',
        message: 'Filme  removido com sucesso',
        objeto: data
    }))
    .catch (err => response.status(400).json({
        status:'error',
        message: 'Erro ao remover filme: ' + err
        
    }))
}


module.exports = {
    getMovieComments,
    addCommentsMovies,
    deleteCommentsMovies
}