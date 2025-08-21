// Estado do jogo
let gameState = {
    currentMode: null,
    currentDeck: [],
    currentCardIndex: 0,
    bellaCount: 0,
    daniCount: 0,
    levelProgression: ['leve', 'intensa', 'extrema', 'durante-ato'],
    currentLevelIndex: 0,
    isResistanceMode: false,
    cardDrawn: false
};

// Elementos DOM
const homePage = document.getElementById('home-page');
const gamePage = document.getElementById('game-page');
const levelIndicator = document.getElementById('level-indicator');
const currentModeSpan = document.getElementById('current-mode');
const levelProgressSpan = document.getElementById('level-progress');
const levelBarFill = document.getElementById('level-bar-fill');
const challengeText = document.getElementById('challenge-text');
const normalButtons = document.getElementById('normal-buttons');
const resistanceButtons = document.getElementById('resistance-buttons');
const drawCardBtn = document.getElementById('draw-card-btn');
const nextCardBtn = document.getElementById('next-card-btn');
const nextCardResistanceBtn = document.getElementById('next-card-resistance-btn');

// Função para iniciar um modo
function startMode(mode) {
    gameState.currentMode = mode;
    gameState.isResistanceMode = (mode === 'resistencia');
    
    // Reset do estado
    gameState.bellaCount = 0;
    gameState.daniCount = 0;
    gameState.currentCardIndex = 0;
    gameState.cardDrawn = false;
    
    if (!gameState.isResistanceMode) {
        // Para modos normais, encontrar o índice do nível atual
        gameState.currentLevelIndex = gameState.levelProgression.indexOf(mode);
        if (gameState.currentLevelIndex === -1) {
            gameState.currentLevelIndex = 0; // Fallback para leve
        }
    }
    
    // Preparar baralho
    gameState.currentDeck = prepareDeck(mode);
    
    // Mostrar página do jogo
    showGamePage();
    
    // Configurar interface
    setupGameInterface();
    
    // Resetar texto da carta
    challengeText.textContent = 'Clique em "Sortear Carta" para começar!';
    challengeText.parentElement.classList.remove('special-card');
}

// Função para mostrar a página do jogo
function showGamePage() {
    homePage.classList.remove('active');
    gamePage.classList.add('active');
    gamePage.classList.add('fade-in');
    
    setTimeout(() => {
        gamePage.classList.remove('fade-in');
    }, 500);
}

// Função para configurar interface do jogo
function setupGameInterface() {
    if (gameState.isResistanceMode) {
        // Modo resistência
        levelIndicator.style.display = 'none';
        normalButtons.style.display = 'none';
        resistanceButtons.style.display = 'flex';
        
        // Resetar botões
        nextCardResistanceBtn.style.display = 'none';
    } else {
        // Modos normais
        levelIndicator.style.display = 'block';
        normalButtons.style.display = 'flex';
        resistanceButtons.style.display = 'none';
        
        // Resetar botões
        drawCardBtn.style.display = 'inline-block';
        nextCardBtn.style.display = 'none';
        
        // Atualizar indicador de nível
        updateLevelIndicator();
    }
}

// Função para atualizar indicador de nível
function updateLevelIndicator() {
    if (gameState.isResistanceMode) return;
    
    const modeNames = {
        'leve': 'Modo Leve 💋',
        'intensa': 'Modo Intensa 🔥',
        'extrema': 'Modo Extrema 😈',
        'durante-ato': 'Modo Durante o Ato 🌶️'
    };
    
    currentModeSpan.textContent = modeNames[gameState.currentMode] || 'Modo Desconhecido';
    levelProgressSpan.textContent = `Bella: ${gameState.bellaCount}/2 | Dani: ${gameState.daniCount}/2`;
    
    // Atualizar barra de progresso
    const totalProgress = (gameState.bellaCount + gameState.daniCount) / 4 * 100;
    levelBarFill.style.width = `${totalProgress}%`;
}

// Função para sortear carta
function drawCard(player = null) {
    if (gameState.currentCardIndex >= gameState.currentDeck.length) {
        // Reembaralhar se acabaram as cartas
        gameState.currentDeck = prepareDeck(gameState.currentMode);
        gameState.currentCardIndex = 0;
    }
    
    const challenge = gameState.currentDeck[gameState.currentCardIndex];
    challengeText.textContent = challenge;
    
    // Verificar se é carta especial (com lubrificante)
    if (challenge.includes('produto especial') || 
        challenge.includes('produto aromático') || 
        challenge.includes('produto refrescante') || 
        challenge.includes('produto aquecido')) {
        challengeText.parentElement.classList.add('special-card');
    } else {
        challengeText.parentElement.classList.remove('special-card');
    }
    
    gameState.cardDrawn = true;
    
    if (gameState.isResistanceMode) {
        // Modo resistência - mostrar botão próxima carta
        resistanceButtons.querySelector('.action-btn.primary').style.display = 'none';
        resistanceButtons.querySelectorAll('.action-btn.primary')[1].style.display = 'none';
        nextCardResistanceBtn.style.display = 'inline-block';
    } else {
        // Modos normais - esconder sortear, mostrar próxima
        drawCardBtn.style.display = 'none';
        nextCardBtn.style.display = 'inline-block';
        
        // Contar carta para o jogador atual (alternando)
        if ((gameState.bellaCount + gameState.daniCount) % 2 === 0) {
            // Vez da Bella
            gameState.bellaCount++;
        } else {
            // Vez do Dani
            gameState.daniCount++;
        }
        
        // Atualizar indicador
        updateLevelIndicator();
        
        // Verificar se deve subir de nível
        checkLevelUp();
    }
}

// Função para verificar subida de nível
function checkLevelUp() {
    if (gameState.isResistanceMode) return;
    
    // Se ambos completaram 2 cartas, subir de nível
    if (gameState.bellaCount >= 2 && gameState.daniCount >= 2) {
        const nextLevelIndex = gameState.currentLevelIndex + 1;
        
        if (nextLevelIndex < gameState.levelProgression.length) {
            // Subir para próximo nível
            setTimeout(() => {
                levelUp(gameState.levelProgression[nextLevelIndex]);
            }, 1000);
        } else {
            // Chegou ao final - mostrar mensagem especial
            setTimeout(() => {
                challengeText.textContent = '🔥 Parabéns! Vocês completaram todos os níveis! 🔥';
                challengeText.parentElement.classList.add('special-card');
            }, 1000);
        }
    }
}

// Função para subir de nível
function levelUp(newMode) {
    // Mostrar mensagem de level up
    challengeText.textContent = `🎉 LEVEL UP! Subindo para ${getModeDisplayName(newMode)}! 🎉`;
    challengeText.parentElement.classList.add('special-card');
    
    // Atualizar estado
    gameState.currentMode = newMode;
    gameState.currentLevelIndex = gameState.levelProgression.indexOf(newMode);
    gameState.bellaCount = 0;
    gameState.daniCount = 0;
    gameState.currentCardIndex = 0;
    
    // Preparar novo baralho
    gameState.currentDeck = prepareDeck(newMode);
    
    // Atualizar interface
    updateLevelIndicator();
    
    // Resetar botões após 3 segundos
    setTimeout(() => {
        challengeText.textContent = 'Clique em "Sortear Carta" para continuar no novo nível!';
        challengeText.parentElement.classList.remove('special-card');
        gameState.cardDrawn = false;
        drawCardBtn.style.display = 'inline-block';
        nextCardBtn.style.display = 'none';
    }, 3000);
}

// Função para obter nome de exibição do modo
function getModeDisplayName(mode) {
    const names = {
        'leve': 'Modo Leve 💋',
        'intensa': 'Modo Intensa 🔥',
        'extrema': 'Modo Extrema 😈',
        'durante-ato': 'Modo Durante o Ato 🌶️'
    };
    return names[mode] || mode;
}

// Função para próxima carta
function nextCard() {
    gameState.currentCardIndex++;
    gameState.cardDrawn = false;
    
    if (gameState.isResistanceMode) {
        // Modo resistência - mostrar botões de sortear novamente
        resistanceButtons.querySelector('.action-btn.primary').style.display = 'inline-block';
        resistanceButtons.querySelectorAll('.action-btn.primary')[1].style.display = 'inline-block';
        nextCardResistanceBtn.style.display = 'none';
        challengeText.textContent = 'Escolha quem vai sortear a próxima carta!';
    } else {
        // Modos normais - mostrar botão sortear novamente
        drawCardBtn.style.display = 'inline-block';
        nextCardBtn.style.display = 'none';
        challengeText.textContent = 'Clique em "Sortear Carta" para continuar!';
    }
    
    challengeText.parentElement.classList.remove('special-card');
}

// Função para voltar ao menu
function goHome() {
    // Reset completo do estado
    gameState = {
        currentMode: null,
        currentDeck: [],
        currentCardIndex: 0,
        bellaCount: 0,
        daniCount: 0,
        levelProgression: ['leve', 'intensa', 'extrema', 'durante-ato'],
        currentLevelIndex: 0,
        isResistanceMode: false,
        cardDrawn: false
    };
    
    // Mostrar página inicial
    gamePage.classList.remove('active');
    homePage.classList.add('active');
    homePage.classList.add('fade-in');
    
    setTimeout(() => {
        homePage.classList.remove('fade-in');
    }, 500);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Garantir que apenas a página inicial está visível
    homePage.classList.add('active');
    gamePage.classList.remove('active');
    
    console.log('🔥 Cartas Bella & Dani carregado com sucesso! 🔥');
    console.log('Para personalizar os desafios, edite o arquivo challenges.js');
});

