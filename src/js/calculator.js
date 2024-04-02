const display  = document.getElementById('display')


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
        row.innerHTML = `<td>${entry.id}</td><td>${entry.operacao}</td><td>${entry.historico}</td>`;
        historicoTableBody.appendChild(row);
      });
      // Aplica o estilo para tornar a tabela rolável
      historicoTableBody.parentElement.style.overflowY = 'scroll';
      historicoTableBody.parentElement.style.maxHeight = '300px'; // Defina a altura máxima desejada para a tabela
    })
    .catch(error => console.error('Erro ao buscar histórico:', error));
}
