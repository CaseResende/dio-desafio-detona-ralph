/* Objeto para gerenciamento de estados globais */
const state = {
  /* Objeto de variáveis que gerenciam algo visual na tela */
  view: {
    squares: document.querySelectorAll(".square"), // Propriedade que captura todos os objetos squares

    enemy: document.querySelector(".enemy"), // Propriedade que captura o objeto enemy

    timeLeft: document.querySelector("#time-left"), // Propriedade que captura o objeto time-left

    score: document.querySelector("#score"), // Propriedade que captura o objeto score
  },

  /* Objeto de variáveis que gerenciam valores */
  values: {
    gameVelocity: 1000, // Propriedade que define o tempo de execução da função moveEnemy

    hitPosition: 0, // Propriedade que guarda o ponto de colisão entre o clique do mouse e inimigo

    result: 0, // Propriedade para guardar a pontuação geral

    currentTime: 60, // Propriedade para armazenar o tempo
  },

  /* Objeto de variáveis que gerenciam ações */
  actions: {
    timerId: setInterval(randomSquare, 1000), // Propriedade para trocar a posição do inimigo

    countDownTimerId: setInterval(countDown, 1000), // Propriedade que controla a função temporizadora countDown, decrementando a cada 1000ms
  },
};

/* Função para sortear a posição do inimigo */
function randomSquare() {
  /* Percorre todos os quadrados e remove a classe enemy */
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  /* Sorteia um número aleatório de 1 a 9 e pega apenas sua parte inteira */
  let randomNumber = Math.floor(Math.random() * 9);

  /* Sorteia um quadrado na mesma posição do número aleatório sorteado */
  let randomSquare = state.view.squares[randomNumber];

  /* Adiciona a classe enemy ao quadrado sorteado */
  randomSquare.classList.add("enemy");

  /* Guarda o id do quadrado sorteado */
  state.values.hitPosition = randomSquare.id;
}

/* Função para manipular evento de clique */
function addListenerHitBox() {
  /* Trabalha com cada um dos quadrados para adicionar um listener de clique de mouse */
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      /* Verifica se o quadrado onde foi clicado é o mesmo em que o inimigo está */
      if (square.id === state.values.hitPosition) {
        /* Adiciona 1 ao result */
        state.values.result++;

        /* Atribui ao placar o valor do result */
        state.view.score.textContent = state.values.result;

        /* Volta a posição do inimigo para nulo, para que o randomSquare altere a posição do inimigo */
        state.values.hitPosition = null;

        /* Toca o som */
        playSound("hit");
      }
    });
  });
}

/* Função que decresce tempo do jogo */
function countDown() {
  /* Decrementa um da currentTime */
  state.values.currentTime--;

  /* Guarda o tempo restante tanto no visual quanto no valor */
  state.view.timeLeft.textContent = state.values.currentTime;

  /* Verifica o fim do jogo */
  if (state.values.currentTime <= 0) {
    /* Limpa os intervalos das ações */
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    /* Anuncia o fim do jogo */
    alert("Game Over! O seu resultado foi: " + state.values.result);
  }
}

/* Função para tocar áudio */
function playSound(audioName) {
  /* Atribui o arquivo de áudio para a variável */
  let audio = new Audio(`./src/audios/${audioName}.m4a`);

  /* Define o volume do áudio */
  audio.volume = 0.2;

  /* Toca o áudio */
  audio.play();
}

/* Função de início (main) */
function initialize() {
  addListenerHitBox();
}

initialize();
