// api1.js
const express = require('express');
const router = express.Router();
const sql = require('mssql');

const config = {
  user: 'CloudSA6c43821a',
  password: 'Yaquim123*',
  server: 'history.database.windows.net',
  database: 'history',
  options: {
    encrypt: true, // Se estiver usando Azure, é necessário criptografar
    trustServerCertificate: false // Se estiver usando Azure, não confie automaticamente no certificado do servidor
  }
};

router.get('/historico', async (req, res) => {
    try {
      // Conecta ao banco de dados
      await sql.connect(config);
  
      // Executa a consulta SQL
      const result = await sql.query('SELECT * FROM historico');
      console.log(result);
  
      // Fecha a conexão com o banco de dados
      await sql.close();
  
      // Retorna os resultados
      res.json(result.recordset);
    } catch (err) {
      console.error('Erro ao buscar registros:', err);
      res.status(500).send('Erro ao buscar registros');
    }
  });

module.exports = router;
