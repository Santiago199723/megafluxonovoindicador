document.addEventListener('DOMContentLoaded', function () {
  let listaClientes = JSON.parse(localStorage.getItem('listaUser')) || [];

  // Função para exibir os usuários na tabela
  function exibirUsuarios() {
    let clientesList = document.getElementById('clientesList');
    clientesList.innerHTML = '';

    // Criação da tabela
    let table = document.createElement('table');
    table.classList.add('clientes-table');

    // Cabeçalho da tabela
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    let headers = ['Selecionar', 'Cliente', 'Nome', 'Usuário', 'Senha'];
    headers.forEach(headerText => {
      let th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Corpo da tabela
    let tbody = document.createElement('tbody');
    listaClientes.forEach((cliente, index) => {
      let tr = document.createElement('tr');

      // Checkbox para selecionar
      let tdCheckbox = document.createElement('td');
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('cliente-checkbox');
      checkbox.dataset.index = index;
      tdCheckbox.appendChild(checkbox);

      // Número do cliente
      let tdNumero = document.createElement('td');
      tdNumero.textContent = index + 1;

      // Nome do cliente
      let tdNome = document.createElement('td');
      tdNome.textContent = cliente.nomeCad;

      // Usuário do cliente
      let tdUsuario = document.createElement('td');
      tdUsuario.textContent = cliente.userCad;

      // Senha do cliente
      let tdSenha = document.createElement('td');
      tdSenha.textContent = cliente.senhaCad;

      // Adiciona as células à linha
      tr.appendChild(tdCheckbox);
      tr.appendChild(tdNumero);
      tr.appendChild(tdNome);
      tr.appendChild(tdUsuario);
      tr.appendChild(tdSenha);

      // Adiciona a linha ao corpo da tabela
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    clientesList.appendChild(table);
  }

  // Função para excluir clientes selecionados
  function excluirClientes() {
    let checkboxes = document.querySelectorAll('.cliente-checkbox:checked');
    let indices = Array.from(checkboxes).map(checkbox => parseInt(checkbox.dataset.index));

    if (indices.length === 0) {
      alert('Selecione pelo menos um cliente para excluir!');
      return;
    }

    // Remove os clientes selecionados da lista
    listaClientes = listaClientes.filter((cliente, index) => !indices.includes(index));

    // Atualiza a lista no localStorage
    localStorage.setItem('listaUser', JSON.stringify(listaClientes));

    // Atualiza a exibição da lista
    exibirUsuarios();
  }

  // Função para voltar para a página de cadastro
  function voltarParaCadastro() {
    // Redireciona para a página de cadastro
    window.location.href = '../html/signup.html';
  }

  // Adiciona ouvintes de eventos aos botões
  document.getElementById('excluirClientesBtn').addEventListener('click', excluirClientes);
  document.getElementById('voltarParaCadastroBtn').addEventListener('click', voltarParaCadastro);

  // Inicializa a exibição dos clientes
  exibirUsuarios();
});
