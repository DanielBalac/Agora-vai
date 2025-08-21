// Arquivo de desafios - SUBSTITUA pelos seus desafios personalizados
// Este arquivo contém placeholders PG-13. Para usar seus desafios originais:
// 1. Substitua cada array abaixo pelos seus desafios
// 2. Mantenha a estrutura: desafios normais primeiro, depois os com lubrificante no final

const CHALLENGES = {
    leve: [
        "BELLA dá um beijo carinhoso em DANI 💋",
        "DANI acaricia o rosto de BELLA suavemente ❤️",
        "BELLA abraça DANI por trás com carinho 🤗",
        "DANI sussurra algo doce no ouvido de BELLA 💕",
        "BELLA dá um selinho e sorri provocante 😘",
        "DANI segura a mão de BELLA e a puxa para perto 👫"
    ],
    
    intensa: [
        "BELLA beija o pescoço de DANI com paixão 💋",
        "DANI abraça BELLA pela cintura e a aproxima 🔥",
        "BELLA senta no colo de DANI carinhosamente 💕",
        "DANI acaricia os cabelos de BELLA suavemente ✨",
        "BELLA dança sensualmente para DANI 💃",
        "DANI encosta BELLA na parede e a beija 😘"
    ],
    
    extrema: [
        "BELLA beija DANI apaixonadamente e para de repente 😏",
        "DANI acaricia BELLA intensamente mas para no meio 🔥",
        "BELLA se aproxima de DANI sedutoramente e se afasta 😈",
        "DANI abraça BELLA forte e a solta de surpresa 💕",
        "BELLA provoca DANI com olhares sensuais 👀",
        "DANI sussurra provocações no ouvido de BELLA 🌶️",
        // Desafios com lubrificante (vão para o final do baralho)
        "BELLA usa produto especial e massageia as mãos de DANI 🍒✨",
        "DANI aplica produto aromático e massageia os ombros de BELLA 🌹💆",
        "BELLA usa produto refrescante e acaricia o rosto de DANI ❄️😘",
        "DANI aplica produto aquecido e massageia as costas de BELLA 🔥💆"
    ],
    
    "durante-ato": [
        "BELLA controla o ritmo da intimidade provocativamente 🔥",
        "DANI inicia o momento íntimo mas para de repente 😏",
        "BELLA lidera o momento com movimentos lentos 💕",
        "DANI intensifica e diminui o ritmo alternadamente 🌶️",
        "BELLA muda de posição de forma provocante 😈",
        "DANI cria expectativa antes de continuar 🔥",
        // Desafios com lubrificante
        "BELLA usa produto especial para intensificar o momento ❄️💕",
        "DANI aplica produto aquecido antes de continuar 🔥✨",
        "BELLA usa produto aromático durante a intimidade 🍒💋",
        "DANI aplica produto refrescante para provocar 🌿❄️"
    ],
    
    resistencia: [
        "BELLA provoca DANI intensamente mas para sorrindo 😏🔥",
        "DANI excita BELLA até o limite mas para de repente 😈💕",
        "BELLA inicia algo intenso e para no melhor momento 🌶️😘",
        "DANI provoca BELLA até ela implorar por mais 🔥👀",
        "BELLA seduz DANI completamente e se afasta rindo 😏💋",
        "DANI leva BELLA ao êxtase mas para antes do final ✨🌶️",
        "BELLA provoca DANI de forma irresistível e para 💕😈",
        "DANI excita BELLA intensamente mas não permite o final 🔥💫",
        "BELLA seduz DANI até o limite da resistência 😘🌶️",
        "DANI usa produto especial para provocar BELLA intensamente ❄️🔥"
    ]
};

// Função para embaralhar array (algoritmo Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Função para separar desafios normais dos com lubrificante
function separateChallenges(challenges) {
    const normal = [];
    const withLube = [];
    
    challenges.forEach(challenge => {
        // Identifica desafios com lubrificante por palavras-chave
        if (challenge.includes('produto especial') || 
            challenge.includes('produto aromático') || 
            challenge.includes('produto refrescante') || 
            challenge.includes('produto aquecido')) {
            withLube.push(challenge);
        } else {
            normal.push(challenge);
        }
    });
    
    return { normal, withLube };
}

// Função para preparar baralho de um modo
function prepareDeck(mode) {
    const challenges = CHALLENGES[mode];
    const { normal, withLube } = separateChallenges(challenges);
    
    // Embaralha desafios normais e coloca os com lubrificante no final
    const shuffledNormal = shuffleArray(normal);
    const shuffledLube = shuffleArray(withLube);
    
    return [...shuffledNormal, ...shuffledLube];
}

