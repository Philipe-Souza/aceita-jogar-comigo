const simButton = document.getElementById('sim');
    const naoButton = document.getElementById('nao');
    const pedidoDiv = document.getElementById('pedido');
    const animacaoDiv = document.getElementById('animacao');
    const senhaDiv = document.getElementById('senha');
    const inputCode = document.getElementById("input-code")

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
      animacaoDiv.style.display = 'none';
      senhaDiv.style.display = 'block';
      inputCode.focus();
      clearTimeout(timer);
    });

    //Pressiona enter
    inputCode.addEventListener("keypress", function(event) {
        let code = inputCode.value.toUpperCase();
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          if(code === "TEAMO"){
            senhaDiv.style.display = 'none';
            animacaoDiv.style.display = 'block';
            // Define o fundo da tela com imagem ou gradiente
    document.body.style.backgroundImage = "url('/hearts.gif')";
          }else{
            alert("Senha incorreta amor");
            inputCode.value = "";
          }
        }
      });

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