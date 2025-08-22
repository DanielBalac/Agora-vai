// Arquivo de desafios - PERSONALIZADO
// Este arquivo já contém seus desafios originais organizados nas categorias
// A lógica de embaralhar e separar os com lubrificante foi mantida

const CHALLENGES = {
    leve: [
        "BELLA dá um beijo lento e profundo em DANI 😘🔥",
        "DANI beija o pescoço de BELLA, bem devagar 💋",
        "BELLA acaricia o pau de DANI por cima da roupa 😏👖",
        "DANI passa a mão entre as pernas de BELLA sem tirar a roupa 👀🔥",
        "BELLA dá um selinho provocante e se afasta com sorriso 😘😉",
        "DANI encosta seu pau na bunda de BELLA, ainda vestidos 😏🍑"
    ],
    
    intensa: [
        "BELLA lambe e beija o pau de DANI por cima da cueca 😏👅",
        "DANI chupa o pescoço de BELLA até deixá-la arrepiada 💋🔥",
        "BELLA senta no colo de DANI e esfrega a buceta contra ele 🔥🍑",
        "DANI beija e morde os seios de BELLA 😈🍒",
        "BELLA dá uma lap dance no colo de DANI 💃🔥",
        "DANI pressiona BELLA contra a parede e beija com força 😘🔥"
    ],
    
    extrema: [
        "BELLA chupa o pau de DANI lentamente, parando de propósito 😏👅",
        "DANI lambe a buceta de BELLA sem deixá-la gozar 👅🔥",
        "BELLA se esfrega nua contra DANI, mas para no meio 😈🍑",
        "DANI mete dois dedos na buceta de BELLA e tira logo depois ✌️🔥",
        "BELLA senta no rosto de DANI por alguns segundos 😈🍑",
        "DANI segura BELLA de quatro, encosta o pau nela, mas não coloca 😏🍆",
        // Desafios com lubrificante
        "BELLA usa o lubrificante de cereja e lambe o pau de DANI 🍒👅🔥",
        "DANI espalha lubrificante quente na buceta de BELLA, mas não penetra 🖐️🔥",
        "BELLA passa lubrificante frio no pau de DANI e provoca com a mão ❄️🍆",
        "DANI espalha lubrificante de cereja nos seios de BELLA e lambe 🍒🔥"
    ],
    
    "durante-ato": [
        "BELLA monta em DANI, mas controla as colocações para deixá-lo no limite 🔥🍑",
        "DANI coloca só a cabecinha do pau na buceta de BELLA, tirando em seguida 😏🍆",
        "BELLA cavalga DANI bem devagar, parando sempre que ele pedir mais 😈🔥",
        "DANI mete forte algumas vezes e para de repente, segurando BELLA 😏💥",
        "BELLA cavalga de costas, mas gira o quadril provocando devagar 🔥🍑",
        "DANI pega BELLA de quatro, mete bem fundo e para de surpresa 😈🍆",
        "BELLA suga o pau de DANI entre as colocações e para sorrindo 😏👅",
        // Desafios com lubrificante
        "DANI passa lubrificante frio no pau e enfia devagar na buceta ❄️🔥",
        "BELLA espalha lubrificante quente no pau e cavalga lentamente 🔥🍆",
        "DANI coloca lubrificante de cereja na buceta e mete devagar 🍒🔥"
    ],
    
    resistencia: [
        "BELLA lambe o pau de DANI até a base, mas para rindo sem deixá-lo gozar 👅🔥",
        "DANI suga o grelo de BELLA até ela estremecer, mas para antes do orgasmo 😈🍑",
        "BELLA cavalga DANI por alguns segundos e sai de cima sorrindo 😏🍑",
        "DANI mete devagar, mas tira de repente e segura o pau 😈🔥",
        "BELLA esfrega a buceta no rosto de DANI e sai de cima antes que ele chupe 👀🍑",
        "DANI enfia dois dedos na buceta de BELLA e para, deixando ela implorar ✌️🔥",
        "BELLA engole o pau de DANI todo e tira de repente, olhando nos olhos 😏🍆",
        "DANI mete forte 3 vezes e para de repente, segurando BELLA 😈🔥",
        "BELLA beija e morde o pau de DANI sem chupá-lo todo 😏👄",
        "DANI passa lubrificante frio na buceta de BELLA e sopra devagar ❄️🔥"
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
        if (challenge.includes('lubrificante')) {
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
    
    const shuffledNormal = shuffleArray(normal);
    const shuffledLube = shuffleArray(withLube);
    
    return [...shuffledNormal, ...shuffledLube];
}
