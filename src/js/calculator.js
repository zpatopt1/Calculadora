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
        row.innerHTML = `<td>${entry.id}</td><td>${entry.historico}</td>`;
        historicoTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Erro ao buscar histórico:', error));
}



