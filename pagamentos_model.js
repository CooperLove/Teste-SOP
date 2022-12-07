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
      'SELECT * FROM public.pagamento ORDER BY "numeroPagamento" DESC',
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getPagamentosPorData = (params) => {
  console.log("Pagamentos");
  const { data } = params;
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * FROM public.pagamento WHERE "dataPagamento" = '${data}'`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};
const getCredorDoPagamento = (params) => {
  const { numeroEmpenho } = params;
  console.log("Credor do pagamento ".numeroEmpenho);
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT "credor" FROM public.pagamento,
      (SELECT "numeroEmpenho" as numemp, "credor" FROM public.empenho, 
      (SELECT "credorDespesa" as credor, "numeroProtocolo" as num FROM public.despesa) as n
      WHERE "num" = "numeroProtocolo") as q
      WHERE "numemp" = ${numeroEmpenho}`,
      (error, results) => {
        if (error) {
          resolve(`Erro ao buscar credor ${error}`);
          return;
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
          console.log("Erro ao criar pagamento: " + error);
          resolve("Erro ao criar pagamento: " + error);
          return;
        }
        console.log("Pagamento criado com sucesso!");
        resolve(`Pagamento criado com sucesso!`);
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
  getPagamentosPorData,
  getCredorDoPagamento,
  createPagamento,
  updatePagamento,
  deletePagamento,
};
