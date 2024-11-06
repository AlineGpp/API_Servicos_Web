const { pool } = require("../config");
const CommentsMovies = require("../entities/commentsMovies");

const getMovieCommentsByIdDB = async (id) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        m.id AS movie_id,
        m.title AS movie_title,
        m.description AS movie_description,
        c.id AS comment_id,
        c.comment AS comment
      FROM movies m
      LEFT JOIN comments c ON m.id = c.movie_id
      WHERE m.id = $1
    `, [id]); // Passa o movieId como parâmetro para a consulta

    // Verificar se algum filme foi encontrado
    if (rows.length === 0) {
      return null; // Retorna null se não houver filme com o ID fornecido
    }

    // Estruturar o resultado
    const movieComments = {
      id: rows[0].movie_id,
      title: rows[0].movie_title,
      description: rows[0].movie_description,
      comments: []
    };

    // Adicionar os comentários se existirem
    rows.forEach(row => {
      const { comment_id, comment } = row;

      if (comment_id) {
        movieComments.comments.push({
          id: comment_id,
          comment: comment
        });
      }
    });

    return movieComments; // Retornar o filme com seus comentários
  } catch (err) {
    throw "Erro: " + err;
  }
};


const addCommentsMoviesDB = async ({ movie_id, comment }) => {
  try {
    // Insere o comentário no banco de dados para o filme especificado
    const results = await pool.query(
      `INSERT INTO comments (movie_id, comment) VALUES ($1, $2) RETURNING movie_id, comment`,
      [movie_id, comment]
    );

    // Retorna o comentário recém-inserido
    const commentsMovies = results.rows[0];
    return {
      movie_id: commentsMovies.movie_id,
      comment: commentsMovies.comment
    };

  } catch (err) {
    throw "Erro ao inserir Comentário: " + err;
  }
};


const deleteCommentMovieDB = async (idMovie,idComment) => {
  try {
    const results = await pool.query(
      `DELETE FROM comments  WHERE  movie_id = $1 AND id = $2`,
      [idMovie,idComment]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o Movie_id ${idMovie} e Comment_id ${idComment} para ser removido`;
    } else {
      return "Filme removido  com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover a pessoa e  programa: " + err;
  }
};

module.exports = {
 addCommentsMoviesDB,
 deleteCommentMovieDB,
 getMovieCommentsByIdDB
};
