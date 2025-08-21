# 🔥 Cartas Bella & Dani - Instruções de Personalização 🔥

## Como usar o site

1. **Abra o arquivo `index.html`** no seu navegador
2. **Escolha um dos 5 modos** disponíveis na tela inicial
3. **Nos modos normais** (Leve → Intensa → Extrema → Durante o Ato):
   - A cada 2 cartas realizadas por cada pessoa, o nível sobe automaticamente
   - O indicador no topo mostra o progresso atual
4. **No modo Resistência**: Provocação alternada com botões separados para cada pessoa

## Funcionalidades implementadas

✅ **5 modos de jogo** com progressão automática  
✅ **Sistema de níveis** que avança a cada 2 cartas por pessoa  
✅ **Embaralhamento** automático dos desafios  
✅ **Desafios com lubrificante** vão para o final do baralho  
✅ **Modo Resistência** com botões separados (Bella/Dani)  
✅ **Visual sexy e minimalista** (preto/branco/vermelho)  
✅ **Design responsivo** para celular e desktop  
✅ **Animações e efeitos** visuais  

## Como personalizar os desafios

### Método 1: Editar diretamente o arquivo `challenges.js`

1. Abra o arquivo `challenges.js` em um editor de texto
2. Substitua os placeholders PG-13 pelos seus desafios originais
3. Mantenha a estrutura dos arrays (leve, intensa, extrema, durante-ato, resistencia)
4. **IMPORTANTE**: Desafios com lubrificante devem conter as palavras-chave:
   - `produto especial`
   - `produto aromático` 
   - `produto refrescante`
   - `produto aquecido`

### Método 2: Usar arquivo JSON externo (avançado)

Se preferir manter seus desafios em arquivo separado:

1. Crie um arquivo `meus-desafios.json` com a estrutura:

```json
{
  "leve": [
    "Seu desafio leve 1",
    "Seu desafio leve 2",
    "..."
  ],
  "intensa": [
    "Seu desafio intensa 1",
    "Seu desafio intensa 2", 
    "..."
  ],
  "extrema": [
    "Seus desafios normais...",
    "Desafio com produto especial (vai pro final)",
    "Outro com produto aromático (vai pro final)"
  ],
  "durante-ato": [
    "Seus desafios...",
    "Desafios com produto especial/aromático/refrescante/aquecido"
  ],
  "resistencia": [
    "Seus desafios de resistência..."
  ]
}
```

2. Modifique o início do arquivo `challenges.js` para carregar do JSON:

```javascript
// Substitua a constante CHALLENGES por:
let CHALLENGES = {};

// Adicione esta função para carregar do JSON:
fetch('meus-desafios.json')
  .then(response => response.json())
  .then(data => {
    CHALLENGES = data;
    console.log('Desafios personalizados carregados!');
  })
  .catch(error => {
    console.log('Usando desafios padrão');
    // Mantenha os CHALLENGES originais como fallback
  });
```

## Estrutura dos arquivos

- `index.html` - Estrutura principal do site
- `style.css` - Estilos visuais (preto/vermelho/branco)
- `script.js` - Lógica do jogo e progressão de níveis
- `challenges.js` - Banco de dados dos desafios
- `INSTRUÇÕES.md` - Este arquivo de instruções

## Dicas importantes

🔥 **Regra dos lubrificantes**: Desafios que contenham as palavras-chave mencionadas automaticamente vão para o final do baralho de cada categoria

🔥 **Progressão automática**: Nos modos normais, quando ambos completam 2 cartas, o jogo automaticamente sobe para o próximo nível

🔥 **Embaralhamento**: A cada novo jogo, os desafios são embaralhados aleatoriamente

🔥 **Responsivo**: O site funciona perfeitamente em celulares e tablets

## Suporte

Se tiver dúvidas sobre personalização, verifique:
1. Se manteve a estrutura dos arrays no `challenges.js`
2. Se as palavras-chave dos lubrificantes estão corretas
3. Se não há erros de sintaxe no JavaScript (abra F12 no navegador para ver)

**Divirta-se! 🔥💋**

