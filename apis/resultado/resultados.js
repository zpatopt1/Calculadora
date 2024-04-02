const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('./databaseconfig_resultados');

router.get('/resultados', async (req, res) => {
    try {
        // Conecta ao banco de dados
        await sql.connect(dbConfig);

        // Executa a consulta SQL
        const result = await sql.query('SELECT * FROM resultados');
    

        // Fecha a conexão com o banco de dados
        await sql.close();

        // Retorna os resultados
        res.json(result.recordset);
    } catch (err) {
        console.error('Erro ao buscar registros:', err);
        res.status(500).send('Erro ao buscar registros');
    }
});


router.post('/resultados', async (req, res) => {
    try {
        // Recupera os dados enviados pelo cliente
        const { resultado } = req.body;

        // Converte o valor do resultado para float
        const resultadoFloat = parseFloat(resultado);

        // Conecta ao banco de dados
        await sql.connect(dbConfig);

        // Executa a consulta SQL para inserir os dados na tabela de resultados
        await sql.query`INSERT INTO resultados (resultado) VALUES (${resultadoFloat})`;

        // Fecha a conexão com o banco de dados
        await sql.close();

        // Retorna uma resposta de sucesso
        res.status(201).send('Registro adicionado com sucesso aos resultados.');
    } catch (err) {
        console.error('Erro ao adicionar registro aos resultados:', err);
        res.status(500).send('Erro ao adicionar registro aos resultados');
    }
});

// Adicione um novo endpoint para deletar todos os registros do histórico
router.delete('/resultados', async (req, res) => {
    try {
        // Conecta ao banco de dados
        await sql.connect(dbConfig);

        // Executa a consulta SQL para deletar todos os registros do histórico
        await sql.query`DELETE FROM resultados `;
        await sql.query`DBCC CHECKIDENT ('resultados', RESEED, 0)`;
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


