const Pool = require("pg").Pool;
const pool = new Pool({
  user: "godlove",
  host: "localhost",
  database: "sopdb",
  password: "root",
  port: 5432,
});
const getDespesas = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM public.despesa ORDER BY "numeroProtocolo" ASC',
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};
const getMerchants = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM merchants ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};
const createMerchant = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new merchant has been added added: ${results.rows[0]}`);
      }
    );
  });
};
const createDespesa = (body) => {
  return new Promise(function (resolve, reject) {
    const { tipoDespesa, credorDespesa, descricaoDespesa, valorDespesa } = body;
    pool.query(
      "INSERT INTO despesa" +
        '("tipoDespesa", "dataProtocolo", "dataVencimento", "credorDespesa", "descricaoDespesa", "valorDespesa", "status")' +
        "VALUES ($1, '2022-12-02', '2022-12-31', $2, $3, $4, 'Aguardando empenho') RETURNING *",
      [tipoDespesa, credorDespesa, descricaoDespesa, valorDespesa],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Query: ${pool.query}`);
        resolve(`A new despesa has been added added: ${results.rows[0]}`);
      }
    );
  });
};
const deleteMerchant = (idMerchant) => {
  return new Promise(function (resolve, reject) {
    const id = idMerchant;
    pool.query(
      "DELETE FROM merchants WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Merchant deleted with ID: ${id}`);
      }
    );
  });
};

module.exports = {
  getDespesas,
  createDespesa,
  getMerchants,
  createMerchant,
  deleteMerchant,
};
