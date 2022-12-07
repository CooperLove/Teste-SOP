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
  console.log("Get credor ", numeroProtocolo);
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT "credor" FROM public.empenho, 
      (SELECT "credorDespesa" as credor, "numeroProtocolo" as num FROM public.despesa) as n
      WHERE "num" = ${numeroProtocolo}`,
      [],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getEmpenhosPorData = (params) => {
  console.log("Empenhos por data");
  const { data } = params;
  return new Promise(function (resolve, reject) {
    pool.query(
      `SELECT * FROM public.empenho WHERE "dataEmpenho" = '${data}'`,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};
const getValorPagamentosDaDespesa = (params) => {
  const { numeroEmpenho } = params;
  console.log("EMP - Valor pagamentos empenho ", numeroEmpenho);
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
    console.log("Body emp ", body);
    pool.query(
      'INSERT INTO public.empenho("anoEmpenho", "dataEmpenho", "valorEmpenho", "observacao", "numeroProtocolo")' +
        " VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [anoEmpenho, dataEmpenho, valorEmpenho, observacao, numeroProtocolo],
      (error, results) => {
        if (error) {
          // reject(error);
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
  getEmpenhosPorData,
  getValorPagamentosDaDespesa,
  getCredorDaDespesa,
  createEmpenho,
  updateEmpenho,
  deleteEmpenho,
};
