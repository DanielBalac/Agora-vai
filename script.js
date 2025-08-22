// Jogo de Desafios – versão SEM progressão e SEM limite de cartas
// Cada categoria funciona de forma independente. Não há subida automática de nível
// e não há contadores de cartas por pessoa.

// Estado do jogo
let gameState = {
  currentMode: null,
  currentDeck: [],
  currentCardIndex: 0,
  isResistanceMode: false,
  cardDrawn: false,
};

// Elementos DOM
const homePage = document.getElementById('home-page');
const gamePage = document.getElementById('game-page');
const levelIndicator = document.getElementById('level-indicator'); // será oculto
const currentModeSpan = document.getElementById('current-mode'); // não usado, mas mantido para compatibilidade
const levelProgressSpan = document.getElementById('level-progress'); // não usado
const levelBarFill = document.getElementById('level-bar-fill'); // não usado
const challengeText = document.getElementById('challenge-text');
const normalButtons = document.getElementById('normal-buttons');
const resistanceButtons = document.getElementById('resistance-buttons');
const drawCardBtn = document.getElementById('draw-card-btn');
const nextCardBtn = document.getElementById('next-card-btn');
const nextCardResistanceBtn = document.getElementById('next-card-resistance-btn');

// Função para iniciar um modo (categoria)
function startMode(mode) {
  gameState.currentMode = mode;
  gameState.isResistanceMode = mode === 'resistencia';

  // Reset de estado da categoria
  gameState.currentCardIndex = 0;
  gameState.cardDrawn = false;

  // Preparar baralho da categoria
  gameState.currentDeck = prepareDeck(mode);

  // Mostrar página do jogo
  showGamePage();

  // Configurar interface sem progressão
  setupGameInterface();

  // Mensagem inicial
  challengeText.textContent = 'Clique em "Sortear Carta" para começar!';
  challengeText.parentElement.classList.remove('special-card');
}

function showGamePage() {
  homePage.classList.remove('active');
  gamePage.classList.add('active');
  gamePage.classList.add('fade-in');
  setTimeout(() => gamePage.classList.remove('fade-in'), 500);
}

function setupGameInterface() {
  // Oculta completamente qualquer indicador de nível/progressão
  if (levelIndicator) levelIndicator.style.display = 'none';

  if (gameState.isResistanceMode) {
    normalButtons.style.display = 'none';
    resistanceButtons.style.display = 'flex';
    nextCardResistanceBtn.style.display = 'none';
    // Garante que os dois botões de sortear estejam visíveis
    const primaries = resistanceButtons.querySelectorAll('.action-btn.primary');
    primaries.forEach((btn) => (btn.style.display = 'inline-block'));
  } else {
    resistanceButtons.style.display = 'none';
    normalButtons.style.display = 'flex';
    drawCardBtn.style.display = 'inline-block';
    nextCardBtn.style.display = 'none';
  }
}

// Sorteio de carta
function drawCard(player = null) {
  if (!gameState.currentDeck || gameState.currentDeck.length === 0) {
    gameState.currentDeck = prepareDeck(gameState.currentMode);
    gameState.currentCardIndex = 0;
  }

  if (gameState.currentCardIndex >= gameState.currentDeck.length) {
    // Reembaralha quando chegar ao fim (sem limite)
    gameState.currentDeck = prepareDeck(gameState.currentMode);
    gameState.currentCardIndex = 0;
  }

  const challenge = gameState.currentDeck[gameState.currentCardIndex];
  challengeText.textContent = challenge;

  // Destaque para cartas "especiais" (com produtos)
  if (
    challenge.includes('produto especial') ||
    challenge.includes('produto aromático') ||
    challenge.includes('produto refrescante') ||
    challenge.includes('produto aquecido')
  ) {
    challengeText.parentElement.classList.add('special-card');
  } else {
    challengeText.parentElement.classList.remove('special-card');
  }

  gameState.cardDrawn = true;

  if (gameState.isResistanceMode) {
    // Esconde botões de sortear e mostra Próxima
    const primaries = resistanceButtons.querySelectorAll('.action-btn.primary');
    primaries.forEach((btn) => (btn.style.display = 'none'));
    nextCardResistanceBtn.style.display = 'inline-block';
  } else {
    drawCardBtn.style.display = 'none';
    nextCardBtn.style.display = 'inline-block';
  }
}

// Próxima carta (avança no baralho da mesma categoria)
function nextCard() {
  gameState.currentCardIndex++;
  gameState.cardDrawn = false;

  if (gameState.isResistanceMode) {
    // Mostra novamente os botões de sortear da resistência
    const primaries = resistanceButtons.querySelectorAll('.action-btn.primary');
    primaries.forEach((btn) => (btn.style.display = 'inline-block'));
    nextCardResistanceBtn.style.display = 'none';
    challengeText.textContent = 'Escolha quem vai sortear a próxima carta!';
  } else {
    drawCardBtn.style.display = 'inline-block';
    nextCardBtn.style.display = 'none';
    challengeText.textContent = 'Clique em "Sortear Carta" para continuar na mesma categoria!';
  }

  challengeText.parentElement.classList.remove('special-card');
}

// Voltar ao menu
function goHome() {
  gameState = {
    currentMode: null,
    currentDeck: [],
    currentCardIndex: 0,
    isResistanceMode: false,
    cardDrawn: false,
  };

  gamePage.classList.remove('active');
  homePage.classList.add('active');
  homePage.classList.add('fade-in');
  setTimeout(() => homePage.classList.remove('fade-in'), 500);
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
  // Oculta indicador de nível (se existir no HTML)
  if (levelIndicator) levelIndicator.style.display = 'none';
  homePage.classList.add('active');
  gamePage.classList.remove('active');
  console.log('Versão sem progressão carregada. Cada categoria é independente.');
});
