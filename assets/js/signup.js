document.addEventListener('DOMContentLoaded', function () {
  let btn = document.querySelector('#verSenha');
  let btnConfirm = document.querySelector('#verConfirmSenha');

  btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha');

    if (inputSenha.getAttribute('type') === 'password') {
      inputSenha.setAttribute('type', 'text');
    } else {
      inputSenha.setAttribute('type', 'password');
    }
  });

  btnConfirm.addEventListener('click', () => {
    let inputConfirmSenha = document.querySelector('#confirmSenha');

    if (inputConfirmSenha.getAttribute('type') === 'password') {
      inputConfirmSenha.setAttribute('type', 'text');
    } else {
      inputConfirmSenha.setAttribute('type', 'password');
    }
  });

  // Adiciona o botão ADM
  let btnAdm = document.createElement('button');
  btnAdm.innerHTML = 'Administração';
  btnAdm.addEventListener('click', mostrarUsuarios);

  // Adiciona o botão ADM à div 'admButtonContainer'
  document.querySelector('#admButtonContainer').appendChild(btnAdm);
});

// Função para mostrar os usuários na área restrita
function mostrarUsuarios() {
  const codigoAdm = prompt('Informe o código para entrar na área restrita');

  // Verifica se o código ADM está correto
  if (codigoAdm === 'admin') {
    // Redireciona para a página de cadastro
    window.location.href = '../html/cadastro.html';
  } else {
    alert('Código incorreto. Acesso negado!');
  }
}

// Validação e lógica de cadastro
let nome = document.querySelector('#nome');
let labelNome = document.querySelector('#labelNome');
let validNome = false;

let usuario = document.querySelector('#usuario');
let labelUsuario = document.querySelector('#labelUsuario');
let validUsuario = false;

let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let confirmSenha = document.querySelector('#confirmSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');
let validConfirmSenha = false;

let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

nome.addEventListener('keyup', validarNome);
usuario.addEventListener('keyup', validarUsuario);
senha.addEventListener('keyup', validarSenha);
confirmSenha.addEventListener('keyup', validarConfirmSenha);

function validarNome() {
  if (nome.value.length <= 2) {
    labelNome.setAttribute('style', 'color: red');
    labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres';
    nome.setAttribute('style', 'border-color: red');
    validNome = false;
  } else {
    labelNome.setAttribute('style', 'color: white');
    labelNome.innerHTML = 'Nome';
    nome.setAttribute('style', 'border-color: white');
    validNome = true;
  }
}

function validarUsuario() {
  if (usuario.value.length <= 4) {
    labelUsuario.setAttribute('style', 'color: red');
    labelUsuario.innerHTML = 'Usuário *Insira no mínimo 5 caracteres';
    usuario.setAttribute('style', 'border-color: red');
    validUsuario = false;
  } else {
    labelUsuario.setAttribute('style', 'color: white');
    labelUsuario.innerHTML = 'Usuário';
    usuario.setAttribute('style', 'border-color: white');
    validUsuario = true;
  }
}

function validarSenha() {
  if (senha.value.length <= 5) {
    labelSenha.setAttribute('style', 'color: red');
    labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres';
    senha.setAttribute('style', 'border-color: red');
    validSenha = false;
  } else {
    labelSenha.setAttribute('style', 'color: white');
    labelSenha.innerHTML = 'Senha';
    senha.setAttribute('style', 'border-color: white');
    validSenha = true;
  }
}

function validarConfirmSenha() {
  if (senha.value !== confirmSenha.value) {
    labelConfirmSenha.setAttribute('style', 'color: red');
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem';
    confirmSenha.setAttribute('style', 'border-color: red');
    validConfirmSenha = false;
  } else {
    labelConfirmSenha.setAttribute('style', 'color: white');
    labelConfirmSenha.innerHTML = 'Confirmar Senha';
    confirmSenha.setAttribute('style', 'border-color: white');
    validConfirmSenha = true;
  }
}

function cadastrar() {
  const usuarioJaCadastrou = localStorage.getItem('cadastroRealizado');
  if (usuarioJaCadastrou) {
    alert('Você só pode cadastrar uma única vez. Só foi liberado acesso a seu IP local. Entre em contato com o suporte.');
    return;
  }

  if (validNome && validUsuario && validSenha && validConfirmSenha) {
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    listaUser.push({
      nomeCad: nome.value,
      userCad: usuario.value,
      senhaCad: senha.value
    });

    localStorage.setItem('listaUser', JSON.stringify(listaUser));

    msgSuccess.setAttribute('style', 'display: block');
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>';
    msgError.setAttribute('style', 'display: none');
    msgError.innerHTML = '';

    localStorage.setItem('cadastroRealizado', 'true');

    setTimeout(() => {
      window.location.href = '../html/cadastro.html';
    }, 3000);
  } else {
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
    msgSuccess.innerHTML = '';
    msgSuccess.setAttribute('style', 'display: none');
  }
}
