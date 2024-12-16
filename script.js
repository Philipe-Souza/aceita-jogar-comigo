const simButton = document.getElementById('sim');
    const naoButton = document.getElementById('nao');
    const pedidoDiv = document.getElementById('pedido');
    const animacaoDiv = document.getElementById('animacao');
    const perguntaUmDiv = document.getElementById('pergunta-um');
    const firstInput = document.getElementById("first-input")
    const inputs = document.querySelectorAll('.input-container input');
    const button = document.getElementById('send');

    // Função para mover o botão "Não" aleatoriamente
    function moverBotaoNao() {
      const maxX = window.innerWidth - naoButton.offsetWidth;
      const maxY = window.innerHeight - naoButton.offsetHeight;
      const newX = Math.floor(Math.random() * maxX);
      const newY = Math.floor(Math.random() * maxY);

      naoButton.style.left = `${newX}px`;
      naoButton.style.top = `${newY}px`;
    }

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

    // Aceitou
    simButton.addEventListener('click', () => {
      pedidoDiv.style.display = 'none';
      perguntaUmDiv.style.display = 'flex';
      firstInput.focus();
      clearTimeout(timer);
    });

   // Move entre os campos ao digitar ou apagar
   inputs.forEach((input, index) => {
    input.addEventListener('input', () => {

      if (input.value && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
      if (e.key === 'Enter') {
        send();
      }
    });
  });

 

  // Botão para capturar e verificar o texto digitado
  button.addEventListener('click', send)
  
  // Captura e verifica texto digitado
  function send() {
    let text = '';
    inputs.forEach(input => {
      text += input.value; // Concatena o valor de cada campo
    });

    // Verifica texto digitado
    if(text.toUpperCase() === "TEAMO"){
      perguntaUmDiv.style.display = 'none';
      animacaoDiv.style.display = 'block';
    }else{
      alert("Resposta incorreta gatinha: " + text);
      inputs.forEach(input => {
        input.value = '';
        firstInput.focus();
      });
    };
  };

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

    // Posiciona o botão "Não" ao lado do botão "Sim"
    naoButton.style.left = `${simButton.offsetLeft + simButton.offsetWidth + 1}px`;
    naoButton.style.top = `${simButton.offsetTop}px`;

    // Cria corações ao clicar ou tocar na tela com diferentes estilos
    document.addEventListener('click', (e) => {
      criarCoracao(e.clientX, e.clientY);
    });

    document.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      criarCoracao(touch.clientX, touch.clientY);
    });