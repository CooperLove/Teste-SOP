const express = require("express");
const app = express();
const port = 3001;

const despesas_model = require("./despesas_model");
const empenhos_model = require("./empenho_model");
const pagamentos_model = require("./pagamentos_model");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/despesas", (req, res) => {
  despesas_model
    .getDespesas()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.get("/tipoDespesas", (req, res) => {
  despesas_model
    .getDespesasTipoDespesa()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.get("/dataProtocolo", (req, res) => {
  despesas_model
    .getDespesasDataProtocolo()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.get("/credorDespesas/:credor", (req, res) => {
  despesas_model
    .getDespesasCredor(req.params)
    .then((response) => {
      console.log(response);
      console.log("Body " + JSON.stringify(req.params));
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log("Erro " + error);
      res.status(500).send(error);
    });
});
app.get("/credorDespesas/data/:dataProtocolo", (req, res) => {
  despesas_model
    .getDespesasCredor(req.params)
    .then((response) => {
      console.log(response);
      console.log("Body data" + JSON.stringify(req.params));
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log("Erro " + error);
      res.status(500).send(error);
    });
});
app.get("/credorDespesas/:credor/:dataProtocolo", (req, res) => {
  despesas_model
    .getDespesasCredor(req.params)
    .then((response) => {
      console.log(response);
      console.log("Body " + JSON.stringify(req.params));
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log("Erro " + error);
      res.status(500).send(error);
    });
});
app.post("/novaDespesa", (req, res) => {
  console.log(req.body);
  despesas_model
    .createDespesa(req.body)
    .then((response) => {
      console.log("Criando despesa: " + req.body);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log("Erro Criando despesa: " + error);
      res.status(500).send(error);
    });
});
app.put("/despesas/update/:id", (req, res) => {
  console.log(req.body);
  despesas_model
    .updateDespesa(req.body)
    .then((response) => {
      console.log("Update despesa: " + req.body);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log("Erro update despesa: " + error);
      res.status(500).send(error);
    });
});

app.delete("/despesas/:numeroProtocolo", (req, res) => {
  console.log(req.params);
  despesas_model
    .deleteDespesa(req.params)
    .then((response) => {
      console.log("Excluir despesa: " + req.params);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log("Erro ao excluir despesa: " + error);
      res.status(500).send(error);
    });
});

app.get("/empenhos", (req, res) => {
  empenhos_model
    .getEmpenhos()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/empenhos/data/:data", (req, res) => {
  empenhos_model
    .getEmpenhosPorData(req.params)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/novoEmpenho", (req, res) => {
  console.log(req.body);
  empenhos_model
    .createEmpenho(req.body)
    .then((response) => {
      console.log("Criando empenho: " + req.body);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log("Erro Criando empenho: " + error);
      res.status(500).send(error);
    });
});

app.put("/empenhos/update/:id", (req, res) => {
  console.log(req.body);
  empenhos_model
    .updateEmpenho(req.body)
    .then((response) => {
      console.log("Update empenho: " + req.body);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log("Erro update empenho: " + error);
      res.status(500).send(error);
    });
});

app.get("/pagamentos", (req, res) => {
  pagamentos_model
    .getPagamentos()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/pagamentos/data/:data", (req, res) => {
  pagamentos_model
    .getPagamentosPorData(req.params)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/novoPagamento", (req, res) => {
  console.log(req.body);
  pagamentos_model
    .createPagamento(req.body)
    .then((response) => {
      console.log("Criando pagamento: " + req.body);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log("Erro Criando pagamento: " + error);
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
