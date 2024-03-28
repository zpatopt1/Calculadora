const display  = document.getElementById('display')

function addInputToDisplay(input) {
  const displayValue = display.value
  display.value = displayValue + input
}

function calculate() {
  if (display.value === '') return

  const result = eval(display.value)
  display.value = result
}

function resetDisplayValue() {
  display.value = ""
}

function removeLastInput() {
  display.value = display.value.slice(0, -1)
}

function historico() {
  // faz router.get('/resultados', async (req, res) => {
  //   try {
  //     // Conecta ao banco de dados
  //     await sql.connect(config);
  
  //     // Executa a consulta SQL
  //     const result = await sql.query('SELECT * FROM resultados');
  //     console.log(result);
  
  //     // Fecha a conexão com o banco de dados
  //     await sql.close();
  
  //     // Retorna os resultados
  //     res.json(result.recordset);
  //   } catch (err) {
  //     console.error('Erro ao buscar registros:', err);
  //     res.status(500).send('Erro ao buscar registros');
  //   }
  // });

}

function resultados() {

  // router.get('/historico', async (req, res) => {
  //   try {
  //     // Conecta ao banco de dados
  //     await sql.connect(config);
  
  //     // Executa a consulta SQL
  //     const result = await sql.query('SELECT * FROM historico');
  //     console.log(result);
  
  //     // Fecha a conexão com o banco de dados
  //     await sql.close();
  
  //     // Retorna os resultados
  //     res.json(result.recordset);
  //   } catch (err) {
  //     console.error('Erro ao buscar registros:', err);
  //     res.status(500).send('Erro ao buscar registros');
  //   }
  // });

}