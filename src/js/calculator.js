const display  = document.getElementById('display')


// Adiciona um event listener para a tabela de histórico
document.getElementById('historico').addEventListener('click', () => {
  document.getElementById('historico-table').style.display = 'block';
  document.getElementById('resultados-table').style.display = 'none';
  showHistorico();
});

// Adiciona um event listener para a tabela de resultados
document.getElementById('resultados').addEventListener('click', () => {
  document.getElementById('historico-table').style.display = 'none';
  document.getElementById('resultados-table').style.display = 'block';
  showResultados();
});



function addInputToDisplay(input) {
  const displayValue = display.value
  display.value = displayValue + input
  
}

function calculate() {
  if (display.value === '') return

  const result = eval(display.value)
  operacao = display.value
  historico = result
  display.value = result

  // Envie os dados para o servidor
  fetch('http://localhost:3000/historico', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ operacao , historico })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao adicionar histórico');
    }
    showHistorico();
    console.log('Histórico adicionado com sucesso');
    console.log(historico);
    console.log(operacao);
  })
  .catch(error => console.error('Erro ao adicionar histórico:', error));
}


function resetDisplayValue() {
  display.value = ""
}

function removeLastInput() {
  display.value = display.value.slice(0, -1)
}

function showHistorico() {
  fetch('http://localhost:3000/historico')
    .then(response => response.json())
    .then(data => {
      const historicoTableBody = document.getElementById('historico-table-body');
      if (!historicoTableBody) {
        console.error('Elemento historico-table-body não encontrado no DOM');
        return;
      }

      // Limpa o conteúdo existente
      historicoTableBody.innerHTML = '';

      // Cria linhas da tabela com os dados do histórico
      data.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${entry.operacao}</td><td>${entry.historico}</td>`;
        historicoTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Erro ao buscar histórico:', error));
}


// Função para deletar todos os registros do histórico
function deleteHistorico() {
  // Envie uma requisição DELETE para o endpoint correspondente no servidor
  fetch('http://localhost:3000/historico', {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao deletar histórico');
    }
    console.log('Todos os registros do histórico foram deletados com sucesso');
    // Atualize a exibição do histórico, se necessário
    showHistorico();
  })
  .catch(error => console.error('Erro ao deletar histórico:', error));
}


function showResultados() {
  fetch('http://localhost:3000/resultados')
    .then(response => response.json())
    .then(data => {
      const resultadosTableBody = document.getElementById('resultados-table-body');
      if (!resultadosTableBody) {
        console.error('Elemento resultados-table-body não encontrado no DOM');
        return;
      }

      // Limpa o conteúdo existente
      resultadosTableBody.innerHTML = '';

      // Cria linhas da tabela com os dados dos resultados
      data.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${entry.resultado}</td>`;
        resultadosTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Erro ao buscar resultados:', error));
}


