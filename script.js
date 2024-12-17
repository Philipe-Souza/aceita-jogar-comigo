const simButton = document.getElementById('sim');
const naoButton = document.getElementById('nao');

const aceitaDiv = document.getElementById('aceita');
const aceitouDiv = document.getElementById('aceitou');

const perguntaUmDiv = document.getElementById('pergunta-um');
const inputs = document.querySelectorAll('.inputs-um input');
const firstInput = document.getElementById("first-input")
const enviarUm = document.getElementById('enviar-um');

const perguntaDoisDiv = document.getElementById('pergunta-dois');
const inputsDois = document.querySelectorAll('.inputs-dois input');
const enviarDois = document.getElementById('enviar-dois');

const perguntaTresDiv = document.getElementById('pergunta-tres');
const inputsTres = document.querySelectorAll('.inputs-tres input');
const enviarTres = document.getElementById('enviar-tres');

const perguntaQuatroDiv = document.getElementById('pergunta-quatro');
const inputsQuatro = document.querySelectorAll('.inputs-quatro input');
const enviarQuatro = document.getElementById('enviar-quatro');

const perguntaCincoDiv = document.getElementById('pergunta-cinco');
const inputsCinco = document.querySelectorAll('.inputs-cinco input');
const enviarCinco = document.getElementById('enviar-cinco');

const video = document.getElementById('video');


//##############################-ANIMAÇÃO-##############################
// Cria corações ao clicar ou tocar na tela com diferentes estilos
function criarCoracao(x, y) {
  const coracao = document.createElement('div');
  coracao.classList.add('coracao');

  // Define a cor e a animação do coração aleatoriamente
  const cores = ['vermelho', 'azul', 'verde'];
  const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
  coracao.classList.add(corAleatoria);

  // Define o emoji do coração aleatoriamente
  const emojis = ['❤️', '🩷', '🧡', '💛', '💚', '💙', '🩵', '💜', '🤎', '🖤', '🩶', '🤍', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '❤️‍🔥', '❤️‍🩹', '🫶', '♥️', '💌'];
  const emojiAleatorio = emojis[Math.floor(Math.random() * emojis.length)];
  coracao.textContent = emojiAleatorio;

  coracao.style.left = `${x}px`;
  coracao.style.top = `${y}px`;

  document.body.appendChild(coracao);

  // Remove o coração após a animação
  setTimeout(() => {
    coracao.remove();
  }, 1500);
}

// Cria corações ao clicar ou tocar na tela com diferentes estilos
document.addEventListener('click', (e) => {
  criarCoracao(e.clientX, e.clientY);
});

document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  criarCoracao(touch.clientX, touch.clientY);
});


// Posiciona o botão "Não" ao lado do botão "Sim"
naoButton.style.left = `${simButton.offsetLeft + simButton.offsetWidth + 1}px`;
naoButton.style.top = `${simButton.offsetTop}px`;

// Função para mover o botão "Não" aleatoriamente
function moverBotaoNao() {
  const maxX = window.innerWidth - naoButton.offsetWidth;
  const maxY = window.innerHeight - naoButton.offsetHeight;
  const newX = Math.floor(Math.random() * maxX);
  const newY = Math.floor(Math.random() * maxY);

  naoButton.style.left = `${newX}px`;
  naoButton.style.top = `${newY}px`;
}

// Move o botão "Não" ao passar o cursor próximo
document.addEventListener('mousemove', (e) => {
  const naoButtonRect = naoButton.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const distance = Math.sqrt(
    Math.pow(mouseX - (naoButtonRect.left + naoButtonRect.width / 2), 2) +
    Math.pow(mouseY - (naoButtonRect.top + naoButtonRect.height / 2), 2)
  );

  if (distance < 100) {
    moverBotaoNao();
  }
});
//##############################-ANIMAÇÃO-##############################



// Precionou botao SIM para jogar 
simButton.addEventListener('click', () => {
  aceitaDiv.style.display = 'none';
  perguntaUmDiv.style.display = 'flex';
  firstInput.focus();
});

// Função para gerenciar o foco entre os campos de entrada e enviar ao pressionar Enter
function configurarInputs(inputs, enviarBtn) {
  inputs.forEach((input, index) => {
    // Mover para o próximo campo ao digitar
    input.addEventListener('input', () => {
      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    // Lidar com o Backspace e Enter
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        inputs[index - 1].focus();
      }

      if (e.key === 'Enter') {
        enviarBtn.click();
      }
    });

  });
}

// Configurar inputs
configurarInputs(inputs, enviarUm);
configurarInputs(inputsDois, enviarDois);
configurarInputs(inputsTres, enviarTres);
configurarInputs(inputsQuatro, enviarQuatro);
configurarInputs(inputsCinco, enviarCinco);



// Captura e verifica texto digitado no input indicado
function send(inputsDiv, firstInput, nextInput, resposta, perguntaDiv, proximaDiv) {
  let text = '';
  const allInputs = document.querySelectorAll(inputsDiv);
  const firstChar = document.getElementById(firstInput);
  const nextChar = document.getElementById(nextInput);
  const thisDiv = document.getElementById(perguntaDiv);
  const nextDiv = document.getElementById(proximaDiv);

  allInputs.forEach(input => {
    text += input.value; // Concatena o valor de cada campo
  });

  // Verifica resposta
  if (text.toUpperCase() === resposta) {
    thisDiv.style.display = 'none';
    nextDiv.style.display = 'flex';
    nextChar.focus();
    if(aceitouDiv.style.display === 'flex'){
      video.play();
    }
  } else {
    alert("Resposta incorreta gatinha: " + text);
    allInputs.forEach(input => {
      input.value = '';
      firstChar.focus();
    });
  };
};