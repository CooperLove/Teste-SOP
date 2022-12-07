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

app.get("/despesas/valorEmpenhos/:numeroProtocolo", (req, res) => {
  despesas_model
    .getValorEmpenhosDaDespesa(req.params)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/despesas/valorPagamentos/:numeroProtocolo", (req, res) => {
  despesas_model
    .getValorPagamentosDaDespesa(req.params)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.get("/empenhos/valorPagamentos/:numeroEmpenho", (req, res) => {
  empenhos_model
    .getValorPagamentosDaDespesa(req.params)
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
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.get("/credorDespesas/data/:dataProtocolo", (req, res) => {
  despesas_model
    .getDespesasCredor(req.params)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.get("/credorDespesas/:credor/:dataProtocolo", (req, res) => {
  despesas_model
    .getDespesasCredor(req.params)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.post("/novaDespesa", (req, res) => {
  despesas_model
    .createDespesa(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.put("/despesas/update/:id", (req, res) => {
  despesas_model
    .updateDespesa(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/despesas/:numeroProtocolo", (req, res) => {
  despesas_model
    .deleteDespesa(req.params)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
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
app.get("/empenhos/credores/:numeroProtocolo", (req, res) => {
  empenhos_model
    .getCredorDaDespesa(req.params)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/pagamentos/credores/:numeroEmpenho", (req, res) => {
  pagamentos_model
    .getCredorDoPagamento(req.params)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/empenhos/:numeroEmpenho", (req, res) => {
  empenhos_model
    .deleteEmpenho(req.params)
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
  empenhos_model
    .createEmpenho(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/empenhos/update/:id", (req, res) => {
  empenhos_model
    .updateEmpenho(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
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
  pagamentos_model
    .createPagamento(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
