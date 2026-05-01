/**
 * LOCALIZA ENG - Motor de Rotas e Grafo
 * Desenvolvido mapeando 100% das salas requeridas e caminhos (linhas vermelhas).
 */

// 1. ESTRUTURA DO GRAFO (Nós, Salas e Interseções)
// I_ = Interseção | C_ = Ponto de Corredor
const graph = {
    // === CORREDORES E INTERSEÇÕES (Linhas Vermelhas) ===
    "I_TL": { "1100": 1, "C_T1": 4, "C_L1": 4 }, // Top-Left intersection
    "C_T1": { "I_TL": 4, "1101": 1, "1102": 1, "1203": 1, "1204": 1, "C_T2": 4 },
    "C_T2": { "C_T1": 4, "1103": 1, "1104": 1, "1205": 1, "1206": 1, "C_T3": 4 },
    "C_T3": { "C_T2": 4, "1105": 1, "1106": 1, "1207": 1, "I_TM": 4 },
    "I_TM": { "C_T3": 4, "C_T4": 4, "C_C1": 4 }, // Top-Middle intersection
    "C_T4": { "I_TM": 4, "1107": 1, "1108": 1, "C_T5": 4 },
    "C_T5": { "C_T4": 4, "1109": 1, "1110": 1, "1214": 1, "C_T6": 4 },
    "C_T6": { "C_T5": 4, "1117": 1, "1216": 1 },

    "C_L1": { "I_TL": 4, "1200": 1, "I_ML": 4 },
    "I_ML": { "C_L1": 4, "C_M1": 4, "C_L2": 4 }, // Middle-Left intersection
    "C_L2": { "I_ML": 4, "1500": 1, "I_BL": 4 },
    
    "C_M1": { "I_ML": 4, "1400": 1, "I_MM": 4 },
    
    "C_C1": { "I_TM": 4, "I_MM": 4 },
    "I_MM": { "C_C1": 4, "C_M1": 4, "1413": 2, "1417": 2, "C_C2": 4 }, // Middle-Middle intersection
    "C_C2": { "I_MM": 4, "I_BM": 4 },

    "I_BL": { "C_L2": 4, "1504": 1, "C_B1": 4 }, // Bottom-Left intersection
    "C_B1": { "I_BL": 4, "1505": 1, "1506": 1, "1507": 1, "1605": 1, "1606": 1, "C_B2": 4 },
    "C_B2": { "C_B1": 4, "1508": 1, "1510": 1, "1511": 1, "1607": 1, "I_BM": 4 },
    "I_BM": { "C_B2": 4, "C_C2": 4, "1608": 1, "1512": 1, "C_B3": 4 }, // Bottom-Middle intersection
    "C_B3": { "I_BM": 4, "1517": 1 },

    // === SALAS (As conexões devem ser bidirecionais no Dijkstra) ===
    "1100": { "I_TL": 1 },
    "1101": { "C_T1": 1 }, "1102": { "C_T1": 1 }, "1203": { "C_T1": 1 }, "1204": { "C_T1": 1 },
    "1103": { "C_T2": 1 }, "1104": { "C_T2": 1 }, "1205": { "C_T2": 1 }, "1206": { "C_T2": 1 },
    "1105": { "C_T3": 1 }, "1106": { "C_T3": 1 }, "1207": { "C_T3": 1 },
    "1107": { "C_T4": 1 }, "1108": { "C_T4": 1 },
    "1109": { "C_T5": 1 }, "1110": { "C_T5": 1 }, "1214": { "C_T5": 1 },
    "1117": { "C_T6": 1 }, "1216": { "C_T6": 1 },

    "1200": { "C_L1": 1 },
    "1500": { "C_L2": 1 },
    "1504": { "I_BL": 1 },
    
    "1400": { "C_M1": 1 },
    "1413": { "I_MM": 2 }, "1417": { "I_MM": 2 },

    "1505": { "C_B1": 1 }, "1506": { "C_B1": 1 }, "1507": { "C_B1": 1 },
    "1605": { "C_B1": 1 }, "1606": { "C_B1": 1 },
    "1508": { "C_B2": 1 }, "1510": { "C_B2": 1 }, "1511": { "C_B2": 1 }, "1607": { "C_B2": 1 },
    "1608": { "I_BM": 1 }, "1512": { "I_BM": 1 },

    // 🚨 A REGRA DE OURO DA SALA 1519 🚨
    // 1517 conecta ao corredor e também é a única passagem para 1519.
    "1517": { "C_B3": 1, "1519": 1 },
    "1519": { "1517": 1 }
};

// Dicionário para traduzir os nós do grafo em texto legível para o usuário
const namesMap = {
    "I_TL": "Interseção Noroeste (Bloco 1100/1200)",
    "C_T1": "Corredor Norte (Setor A)",
    "C_T2": "Corredor Norte (Setor B)",
    "C_T3": "Corredor Norte (Setor C)",
    "I_TM": "Interseção Principal de Entrada",
    "C_T4": "Corredor Nordeste (Banheiros)",
    "C_T5": "Corredor Nordeste (Setor A)",
    "C_T6": "Final do Corredor Nordeste",
    "C_L1": "Corredor Oeste (Bloco 1200)",
    "I_ML": "Interseção Centro-Oeste",
    "C_L2": "Corredor Oeste (Bloco 1500)",
    "C_M1": "Corredor Central (Bloco 1400)",
    "C_C1": "Corredor de Interligação Norte-Centro",
    "I_MM": "Interseção Central do Pátio",
    "C_C2": "Corredor de Interligação Centro-Sul",
    "I_BL": "Interseção Sudoeste",
    "C_B1": "Corredor Sul (Setor A)",
    "C_B2": "Corredor Sul (Setor B)",
    "I_BM": "Interseção Principal Sul",
    "C_B3": "Acesso Leste (Bloco 1500)"
};

// 2. INICIALIZAÇÃO DA INTERFACE (Popula selects ignorando nós de corredor)
document.addEventListener("DOMContentLoaded", () => {
    const originSelect = document.getElementById("origin");
    const destSelect = document.getElementById("destination");

    // Filtra apenas chaves que são números (salas)
    const rooms = Object.keys(graph).filter(node => !isNaN(node)).sort();

    rooms.forEach(room => {
        const opt1 = document.createElement("option");
        opt1.value = room;
        opt1.textContent = `Sala ${room}`;
        originSelect.appendChild(opt1);

        const opt2 = document.createElement("option");
        opt2.value = room;
        opt2.textContent = `Sala ${room}`;
        destSelect.appendChild(opt2);
    });
});

// 3. ALGORITMO DE DIJKSTRA (Menor Caminho)
function dijkstra(graph, startNode, endNode) {
    let distances = {};
    let prev = {};
    let pq = []; // Fila de prioridade simples

    // Inicializa distâncias
    for (let node in graph) {
        distances[node] = Infinity;
        prev[node] = null;
    }
    distances[startNode] = 0;
    pq.push({ node: startNode, dist: 0 });

    while (pq.length > 0) {
        // Ordena para pegar o menor (Simula Priority Queue)
        pq.sort((a, b) => a.dist - b.dist);
        let curr = pq.shift();
        let currNode = curr.node;

        if (currNode === endNode) break;

        for (let neighbor in graph[currNode]) {
            let alt = distances[currNode] + graph[currNode][neighbor];
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                prev[neighbor] = currNode;
                pq.push({ node: neighbor, dist: alt });
            }
        }
    }

    // Reconstrói o caminho
    let path = [];
    let u = endNode;
    if (prev[u] !== null || u === startNode) {
        while (u !== null) {
            path.unshift(u);
            u = prev[u];
        }
    }
    return path;
}

// 4. TRADUTOR DE ROTAS (Gera Instruções Humanas)
function generateInstructions(path) {
    const list = document.getElementById("instructions-list");
    list.innerHTML = ""; // Limpa anterior

    if (path.length === 0) {
        list.innerHTML = "<li>Não foi possível encontrar um caminho.</li>";
        return;
    }

    if (path.length === 1) {
        list.innerHTML = "<li>Você já está no seu destino.</li>";
        return;
    }

    // Passo 1: Saída
    addListItem(`Saia da Sala ${path[0]} e entre no corredor.`);

    // Passo 2: Interseções e Corredores do meio
    for (let i = 1; i < path.length - 1; i++) {
        let node = path[i];
        let nextNode = path[i+1];

        // 🚨 Validação da Regra de Ouro da sala 1519
        if (node === "1517" && nextNode === "1519") {
            addListItem(`<strong>Atenção:</strong> Entre e atravesse a Sala 1517 para conseguir acessar a Sala 1519.`, 'golden-rule');
            continue; // Pula a instrução normal para esse nó
        }

        // Se for um nó de corredor/interseção, traduz.
        if (isNaN(node)) {
            let friendlyName = namesMap[node] || "Corredor";
            // Para não ficar repetitivo, só avisa se for uma interseção principal
            if (node.startsWith("I_")) {
                addListItem(`Siga em frente até a ${friendlyName}.`);
            }
        }
    }

    // Passo 3: Chegada
    addListItem(`Você chegou ao seu destino: <strong>Sala ${path[path.length - 1]}</strong>! 🎉`);
}

function addListItem(text, className = '') {
    const list = document.getElementById("instructions-list");
    const li = document.createElement("li");
    li.innerHTML = text;
    if (className) li.classList.add(className);
    list.appendChild(li);
}

// 5. EVENT LISTENER DO FORMULÁRIO
document.getElementById("route-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const origin = document.getElementById("origin").value;
    const dest = document.getElementById("destination").value;

    if (origin === dest) {
        alert("A origem e o destino são iguais!");
        return;
    }

    // Roda o Dijkstra
    const shortestPath = dijkstra(graph, origin, dest);
    
    // Mostra o card e gera texto
    const resultCard = document.getElementById("result-card");
    resultCard.classList.remove("hidden");
    
    // Re-trigger a animação do card
    resultCard.style.animation = 'none';
    resultCard.offsetHeight; // trigger reflow
    resultCard.style.animation = null;

    generateInstructions(shortestPath);
    
    // Scroll suave para o resultado
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});