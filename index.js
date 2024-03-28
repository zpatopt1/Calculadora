// index.js
const express = require('express');
const gatewayRoutes = require('./apis/gateway');
const historicoRoutes = require('./apis/historico');
const resultadosRoutes = require('./apis/resultados');

const app = express();
const PORT = process.env.PORT || 3000;

//Use as rotas das APIs
app.use(gatewayRoutes);
app.use(historicoRoutes);
app.use(resultadosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
