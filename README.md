# 🗺️ LocalizaEng - Sistema de Navegação Indoor

O LocalizaEng é uma aplicação web voltada para estudantes universitários, projetada para traçar a menor rota entre salas do Prédio da Engenharia. Construída com um design "Awwwards-level" (Glassmorphism e Neobrutalismo), a aplicação utiliza Teoria dos Grafos em Javascript puro para mapear a planta arquitetônica e calcular distâncias.

## ⚙️ Como o Algoritmo Funciona
O motor do sistema utiliza o **Algoritmo de Dijkstra** para encontrar o caminho mais curto.
1. **O Mapa como Grafo**: A planta do prédio (linhas vermelhas) foi dividida em "Nós" (Nodes). As interseções viraram nós do tipo `I_`, trechos de corredor viraram `C_` e as salas são numéricas.
2. **As Arestas**: A ligação de uma sala para o corredor tem `peso 1`. A ligação entre trechos de corredor possui pesos proporcionais ao tamanho físico na planta (ex: `peso 4`).
3. **Regra da Sala 1519**: Conforme especificado, a sala 1519 é isolada. O único meio de chegar a ela é através de uma aresta direcionada a partir da sala 1517.
4. **Tradução**: Após o Dijkstra devolver o Array do caminho (ex: `['1100', 'I_TL', 'C_L1', '1200']`), o sistema mapeia isso para um português legível através do dicionário `namesMap`.

## 🛠️ Como Adicionar Novas Salas (Expansão do Mapa)
Caso o prédio ganhe uma "Sala 1700" próxima ao corredor central inferior (`I_BM`):
1. Abra o `script.js`.
2. Vá até o objeto `const graph = { ... }`.
3. Adicione a sala apontando para o corredor: `"1700": { "I_BM": 1 }`.
4. Atualize o corredor para apontar de volta para a sala: Modifique `"I_BM": { ... , "1700": 1 }`.
5. Pronto! O HTML (selects) detectará automaticamente a nova sala pois é populado dinamicamente pelas chaves do grafo.

## 🚀 Como Rodar Localmente (VS Code)
1. Certifique-se de que a imagem da planta está na mesma pasta dos arquivos, salva com o nome **`pngcaminhos.jpg`**.
2. Abra a pasta do projeto no VS Code.
3. Instale a extensão **Live Server** (feita por Ritwick Dey).
4. Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**.
5. O projeto abrirá no seu navegador, recarregando automaticamente a cada save.

## 🌐 Como Hospedar de Graça (GitHub Pages)
Você pode colocar o site no ar de graça direto pelo terminal!

1. Inicialize um repositório git na pasta do projeto:
   ```bash
   git init
   git add .
   git commit -m "Versão 1.0 - LocalizaEng"