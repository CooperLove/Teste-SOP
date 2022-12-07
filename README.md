# API com endpoints do Teste requisitado pela Superintendência de Obras Públicas

## `Endpoints Despesa: ` 
#### `/despesas `  
Lista todas as despesas em ordem agrupadas pela data do protocolo em descendente 

#### `/despesas/valorEmpenhos/${numeroProtocolo} ` 
Lista  o valor dos empenhos associados a despesa de número **{numeroProtocolo}** 

#### `/despesas/valorPagamentos/${numeroProtocolo} ` 
Lista o valor de todos os pagamentos associados a despesa de número **{numeroProtocolo}** 

#### `/credorDespesas/${credor} ` 
Retorna dos credores das despesas 

#### `/credorDespesas/data/${dataProtocolo} ` 
Retorna todas as despesas com data do protocolo igual a **{dataProtocolo}**

#### `/credorDespesas/${credor}/${dataProtocolo} ` 
Retorna todas as despesas com tipo de despesa ou credor da despesa que contenha **{credor}** e tenha data do protocolo igual a **{dataProtocolo}**

#### `/novaDespesa` 
Cria uma nova despesa com os dados passados pelo [Frontend](https://github.com/CooperLove/Teste-SOP-Frontend)

#### `/despesas/${numeroProtocolo} ` 
Deleta a despesa de número {numeroProtocolo} caso não tenha nenhum empenho associado a ela


## `Enpoints Empenho: ` 
#### `/empenhos ` 
Lista todos os empenhos com base no número do empenho e em ordem descrescente

#### `/empenhos/data/${data} ` 
Lista todos os empenhos com data do empenho igual a **{data}**

#### `/empenhos/valorPagamentos/${numeroEmpenho} ` 
Retorna o valor de todos os pagamentos associados ao empenho com número de empenho igual a **{numeroEmpenho}**

#### `/empenhos/credores/${numeroProtocolo} ` 
Retorna o credor do empenho com número de empenho igual a **{numeroEmpenho}**

#### `/novoEmpenho ` 
Cria um novo empenho com base na despesa exibida no [Frontend](https://github.com/CooperLove/Teste-SOP-Frontend) <br/>
Os dados são preenchidos de acordo com a despesa que o usuário está consultando.

#### `/empenhos/${numeroEmpenho} ` 
Deleta o empenho de número igual a **{numeroEmpenh}**, caso não exista nenhum pagamento associado a ele.


## `Endpoints Pagamento:` 
#### `/pagamentos ` 
Lista todos os pagamentos com base no ano do pagamento e em ordem descrescente

#### `/pagamentos/data/${data} ` 
Retorna todos os pagamentos com data de pagamento igual a **{data}**

#### `/pagamentos/credores/${numeroEmpenho} ` 
Retorna o credor do pagamento com base no número do empenho **{numeroEmpenho}** que o mesmo está associado.

#### `/novoPagamento ` 
Cria um novo pagamento com base no empenho exibido no [Frontend](https://github.com/CooperLove/Teste-SOP-Frontend) <br/>
Os dados são preenchidos de acordo com o empenho que o usuário está consultando.
