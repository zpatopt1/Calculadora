const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('./databaseconfig_historico');


router.get('/historico', async (req, res) => {
    try {
        // Conecta ao banco de dados
        await sql.connect(dbConfig);

        // Executa a consulta SQL
        const result = await sql.query('SELECT * FROM historico');

        // Fecha a conexão com o banco de dados
        await sql.close();

        // Retorna os resultados
        res.json(result.recordset);
    } catch (err) {
        console.error('Erro ao buscar registros:', err);
        res.status(500).send('Erro ao buscar registros');
    }
});


router.post('/historico', async (req, res) => {
    try {
        // Recupera os dados enviados pelo cliente
        const { operacao , historico } = req.body;

        // Converte o valor de historico para float
        const historicoFloat = parseFloat(historico);

        // Conecta ao banco de dados
        await sql.connect(dbConfig);

        // Executa a consulta SQL para inserir os dados na tabela de histórico
        await sql.query`INSERT INTO historico (operacao, historico) VALUES (${operacao}, ${historicoFloat})`;

        // Fecha a conexão com o banco de dados
        await sql.close();

        // Retorna uma resposta de sucesso
        res.status(201).send('Registro adicionado com sucesso ao histórico.');
    } catch (err) {
        console.error('Erro ao adicionar registro ao histórico:', err);
        res.status(500).send('Erro ao adicionar registro ao histórico');
    }
});

// Adicione um novo endpoint para deletar todos os registros do histórico
router.delete('/historico', async (req, res) => {
    try {
        // Conecta ao banco de dados
        await sql.connect(dbConfig);

        // Executa a consulta SQL para deletar todos os registros do histórico
        await sql.query`DELETE FROM historico `;
        await sql.query`DBCC CHECKIDENT ('historico', RESEED, 0)`;
        // Fecha a conexão com o banco de dados
        await sql.close();

        // Retorna uma resposta de sucesso
        res.status(200).send('Todos os registros do histórico foram deletados com sucesso.');
    } catch (err) {
        console.error('Erro ao deletar registros do histórico:', err);
        res.status(500).send('Erro ao deletar registros do histórico');
    }
});



module.exports = router;
