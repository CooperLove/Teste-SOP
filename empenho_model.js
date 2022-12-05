const Pool = require("pg").Pool;
const pool = new Pool({
  user: "godlove",
  host: "localhost",
  database: "sopdb",
  password: "root",
  port: 5432,
});
const getEmpenhos = () => {
  console.log("Empenhos");
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM public.empenho ORDER BY "numeroEmpenho" ASC',
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const createEmpenho = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      anoEmpenho,
      dataEmpenho,
      valorEmpenho,
      observacao,
      numeroProtocolo,
    } = body;
    pool.query(
      'INSERT INTO public.empenho("anoEmpenho", "dataEmpenho", "valorEmpenho", "observacao", "numeroProtocolo")' +
        " VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [anoEmpenho, dataEmpenho, valorEmpenho, observacao, numeroProtocolo],
      (error, results) => {
        if (error) {
          reject(error);
        }
        // resolve(`A new empenho has been added added: ${results.rows[0]}`);
      }
    );
  });
};

const deleteEmpenho = (idEmpenho) => {
  return new Promise(function (resolve, reject) {
    const id = idEmpenho;
    pool.query(
      "DELETE FROM merchants WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Empenho deleted with ID: ${id}`);
      }
    );
  });
};

const updateEmpenho = (body) => {
  return new Promise(function (resolve, reject) {
    const { numeroProtocolo, descricaoEmpenho, status } = body;
    pool.query(
      "UPDATE PUBLIC.EMPENHO " +
        'SET "descricaoEmpenho" = $2,' +
        '"status" = $3' +
        ' WHERE "numeroProtocolo" = $1',
      [numeroProtocolo, descricaoEmpenho, status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Empenho deleted with ID: ${numeroProtocolo}`);
      }
    );
  });
};

module.exports = {
  getEmpenhos,
  createEmpenho,
  updateEmpenho,
  deleteEmpenho,
};
