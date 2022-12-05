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

const getDespesasDataProtocolo = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'SELECT * FROM public.despesa ORDER BY "dataProtocolo" ASC',
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getDespesasTipoDespesa = (params) => {
  return new Promise(function (resolve, reject) {
    console.log("Params " + JSON.stringify(params));
    const { tipoDespesa } = params;
    let query = `SELECT * FROM public.despesa WHERE \"tipoDespesa\" LIKE '%${tipoDespesa}%'`;
    console.log(query);

    pool.query(
      `SELECT * FROM public.despesa WHERE \"tipoDespesa\" LIKE '%${tipoDespesa}%'`,
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

const getDespesasCredor = (params) => {
  return new Promise(function (resolve, reject) {
    console.log("Params " + JSON.stringify(params));
    const { credor, dataProtocolo } = params;
    let query =
      dataProtocolo !== "" && credor !== undefined && credor !== ""
        ? `SELECT * FROM public.despesa 
        WHERE \"credorDespesa\" LIKE '%${credor}%' 
        OR \"tipoDespesa\" LIKE '%${credor}%'`
        : credor !== undefined && credor !== ""
        ? `SELECT * FROM public.despesa 
      WHERE \"credorDespesa\" LIKE '%${credor}%' 
      OR \"tipoDespesa\" LIKE '%${credor}%'`
        : `SELECT * FROM public.despesa 
      WHERE \"dataProtocolo\" = '${dataProtocolo}'`;
    console.log(query);

    pool.query(
      dataProtocolo !== "" && credor !== undefined && credor !== ""
        ? `SELECT * FROM public.despesa 
        WHERE \"credorDespesa\" LIKE '%${credor}%' 
        OR \"tipoDespesa\" LIKE '%${credor}%'`
        : credor !== undefined && credor !== ""
        ? `SELECT * FROM public.despesa 
      WHERE \"credorDespesa\" LIKE '%${credor}%' 
      OR \"tipoDespesa\" LIKE '%${credor}%'`
        : `SELECT * FROM public.despesa 
      WHERE \"dataProtocolo\" = '${dataProtocolo}'`,
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
        resolve(`A new despesa has been added added: ${results.rows[0]}`);
      }
    );
  });
};

const deleteDespesa = (idMerchant) => {
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

const updateDespesa = (body) => {
  return new Promise(function (resolve, reject) {
    const { numeroProtocolo, descricaoDespesa, status } = body;
    pool.query(
      "UPDATE PUBLIC.DESPESA " +
        'SET "descricaoDespesa" = $2,' +
        '"status" = $3' +
        ' WHERE "numeroProtocolo" = $1',
      [numeroProtocolo, descricaoDespesa, status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Merchant deleted with ID: ${numeroProtocolo}`);
      }
    );
  });
};

module.exports = {
  getDespesas,
  getDespesasTipoDespesa,
  getDespesasDataProtocolo,
  getDespesasCredor,
  createDespesa,
  updateDespesa,
  deleteDespesa,
};
