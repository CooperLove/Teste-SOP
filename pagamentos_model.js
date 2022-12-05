const Pool = require("pg").Pool;
const pool = new Pool({
  user: "godlove",
  host: "localhost",
  database: "sopdb",
  password: "root",
  port: 5432,
});
const getPagamentos = () => {
  console.log("Pagamentos");
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM public.pagamento ORDER BY "numeroPagamento" ASC',
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const createPagamento = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      anoPagamento,
      dataPagamento,
      valorPagamento,
      observacao,
      numeroEmpenho,
    } = body;
    pool.query(
      "INSERT INTO public.pagamento(" +
        '"anoPagamento", "dataPagamento", "valorPagamento", "observacao", "numeroEmpenho")' +
        " VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [anoPagamento, dataPagamento, valorPagamento, observacao, numeroEmpenho],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new pagamento has been added added: ${results.rows[0]}`);
      }
    );
  });
};

const deletePagamento = (idPagamento) => {
  return new Promise(function (resolve, reject) {
    const id = idPagamento;
    pool.query(
      "DELETE FROM merchants WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Pagamento deleted with ID: ${id}`);
      }
    );
  });
};

const updatePagamento = (body) => {
  return new Promise(function (resolve, reject) {
    const { numeroProtocolo, descricaoPagamento, status } = body;
    pool.query(
      "UPDATE PUBLIC.EMPENHO " +
        'SET "descricaoPagamento" = $2,' +
        '"status" = $3' +
        ' WHERE "numeroProtocolo" = $1',
      [numeroProtocolo, descricaoPagamento, status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Pagamento deleted with ID: ${numeroProtocolo}`);
      }
    );
  });
};

module.exports = {
  getPagamentos,
  createPagamento,
  updatePagamento,
  deletePagamento,
};