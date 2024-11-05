const { pool } = require("../config");
const Movies = require("../entities/movies");

const getMoviesDB = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM movies");
    return rows.map(
      (movies) =>
        new Movies(
          movies.id,
          movies.title,
          movies.description,
          movies.image,
          movies.notice,
          movies.year,
          movies.link
        )
    );
  } catch (err) {
    throw "Erro : " + err;
  }
};

const updateNoticeMovieDB = async (body) => {
  try {
    const { id, notice} = body;
    const results = await pool.query(
      `UPDATE movies SET notice = $2
       WHERE id = $1
        RETURNING id, notice`,
      [id, notice]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o ID ${id} para ser alterado`;
    }
    const movie = results.rows[0];
    return new Movies(
      movie.id,
      movie.notice,
    );
  } catch (err) {
    throw "Erro ao alterar a nota: " + err;
  }
};

const deleteMovieDB = async (id) => {
  try {
    const results = await pool.query(`DELETE FROM movies where id = $1`, [id]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o ID ${id} para ser removido`;
    } else {
      return "Filme removido com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover a pessoa: " + err;
  }
};

// const getPeoplePorCodigoDB = async (id) => {
//   try {
//     const results = await pool.query(`SELECT * FROM people where id = $1`, [
//       id,
//     ]);
//     if (results.rowCount == 0) {
//       throw "Nenhum registro encontrado com o ID: " + id;
//     } else {
//       const people = results.rows[0];
//       return new People(
//         people.id,
//         people.name,
//         people.e_mail,
//         people.login,
//         people.password
//       );
//     }
//   } catch (err) {
//     throw "Erro ao recuperar a pessoa: " + err;
//   }
// };

module.exports = {
  getMoviesDB,
  updateNoticeMovieDB,
  deleteMovieDB
};
