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
      'SELECT * FROM public.empenho ORDER BY "numeroEmpenho" DESC',
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};
const getCredorDaDespesa = (params) => {
  const { numeroProtocolo } = params;
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT "credor" FROM public.empenho, 
      (SELECT "credorDespesa" as credor, "numeroProtocolo" as num FROM public.despesa) as n
      WHERE "num" = ${numeroProtocolo}`,
      [],
      (error, results) => {
        if (error) {
          resolve(`Erro ao recuperar nome do credor do empenho ${error}`);
          return;
        }
        resolve(results.rows);
      }
    );
  });
};

const getEmpenhosPorData = (params) => {
  const { data } = params;
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * FROM public.empenho WHERE "dataEmpenho" = '${data}'`,
      (error, results) => {
        if (error) {
          resolve(`Erro ao recuperar empenho com data ${data} ${error}`);
        }
        resolve(results.rows);
      }
    );
  });
};
const getValorPagamentosDaDespesa = (params) => {
  const { numeroEmpenho } = params;
  "EMP - Valor pagamentos empenho ", numeroEmpenho;
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT SUM("valorPagamento") FROM 
        public.pagamento,
        (SELECT "numeroEmpenho" as num FROM public.empenho 
        WHERE "numeroEmpenho" = ${numeroEmpenho}) as n
        WHERE "numeroEmpenho" = "num";`,
      (error, results) => {
        if (error) {
          resolve("Erro ", error);
          return;
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
    "Body emp ", body;
    pool.query(
      'INSERT INTO public.empenho("anoEmpenho", "dataEmpenho", "valorEmpenho", "observacao", "numeroProtocolo")' +
        " VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [anoEmpenho, dataEmpenho, valorEmpenho, observacao, numeroProtocolo],
      (error, results) => {
        if (error) {
          console.log("Já existe um registro de empenho para essa despesa!");
          resolve("Já existe um registro de empenho para essa despesa!");
          return;
        }
        resolve(`Empenho criado com sucesso!`);
      }
    );
  });
};

const deleteEmpenho = (params) => {
  const { numeroEmpenho } = params;
  console.log("Excluindo empenho ", numeroEmpenho);
  return new Promise(function (resolve, reject) {
    pool.query(
      `DELETE FROM public.empenho WHERE "numeroEmpenho" = ${numeroEmpenho}`,
      [],
      (error, results) => {
        if (error) {
          resolve(
            `Não foi possível excluir o empenho ${numeroEmpenho}, pois há registros de pagamentos associados a ele.`
          );
          return;
        }
        resolve(`Empenho ${numeroEmpenho} excluido com sucesso.`);
      }
    );
  });
};

module.exports = {
  getEmpenhos,
  getEmpenhosPorData,
  getValorPagamentosDaDespesa,
  getCredorDaDespesa,
  createEmpenho,
  deleteEmpenho,
};
