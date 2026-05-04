/**
 * LOCALIZA ENG - Motor de Rotas com Consciência Espacial (Direita/Esquerda)
 */

// 1. ESTRUTURA DO GRAFO (Lista de Adjacência)
const graph = {
    "I_TL": { "1100": 1, "C_T1": 4, "C_L1": 4 }, 
    "C_T1": { "I_TL": 4, "1101": 1, "1102": 1, "1203": 1, "1204": 1, "C_T2": 4 },
    "C_T2": { "C_T1": 4, "1103": 1, "1104": 1, "1205": 1, "1206": 1, "C_T3": 4 },
    "C_T3": { "C_T2": 4, "1105": 1, "1106": 1, "1207": 1, "I_TM": 4 },
    "I_TM": { "C_T3": 4, "C_T4": 4, "C_C1": 4 }, 
    "C_T4": { "I_TM": 4, "1107": 1, "1108": 1, "C_T5": 4 },
    "C_T5": { "C_T4": 4, "1109": 1, "1110": 1, "1214": 1, "C_T6": 4 },
    "C_T6": { "C_T5": 4, "1117": 1, "1216": 1 },
    "C_L1": { "I_TL": 4, "1200": 1, "I_ML": 4 },
    "I_ML": { "C_L1": 4, "C_M1": 4, "C_L2": 4 }, 
    "C_L2": { "I_ML": 4, "1500": 1, "I_BL": 4 },
    "C_M1": { "I_ML": 4, "1400": 1, "I_MM": 4 },
    "C_C1": { "I_TM": 4, "I_MM": 4 },
    "I_MM": { "C_C1": 4, "C_M1": 4, "1413": 2, "1417": 2, "C_C2": 4 }, 
    "C_C2": { "I_MM": 4, "I_BM": 4 },
    "I_BL": { "C_L2": 4, "1504": 1, "C_B1": 4 }, 
    "C_B1": { "I_BL": 4, "1505": 1, "1506": 1, "1507": 1, "1605": 1, "1606": 1, "C_B2": 4 },
    "C_B2": { "C_B1": 4, "1508": 1, "1510": 1, "1511": 1, "1607": 1, "I_BM": 4 },
    "I_BM": { "C_B2": 4, "C_C2": 4, "1608": 1, "1512": 1, "C_B3": 4 }, 
    "C_B3": { "I_BM": 4, "1517": 1 },

    // SALAS
    "1100": { "I_TL": 1 },
    "1101": { "C_T1": 1 }, "1102": { "C_T1": 1 }, "1203": { "C_T1": 1 }, "1204": { "C_T1": 1 },
    "1103": { "C_T2": 1 }, "1104": { "C_T2": 1 }, "1205": { "C_T2": 1 }, "1206": { "C_T2": 1 },
    "1105": { "C_T3": 1 }, "1106": { "C_T3": 1 }, "1207": { "C_T3": 1 },
    "1107": { "C_T4": 1 }, "1108": { "C_T4": 1 },
    "1109": { "C_T5": 1 }, "1110": { "C_T5": 1 }, "1214": { "C_T5": 1 },
    "1117": { "C_T6": 1 }, "1216": { "C_T6": 1 },
    "1200": { "C_L1": 1 }, "1500": { "C_L2": 1 }, "1504": { "I_BL": 1 },
    "1400": { "C_M1": 1 }, "1413": { "I_MM": 2 }, "1417": { "I_MM": 2 },
    "1505": { "C_B1": 1 }, "1506": { "C_B1": 1 }, "1507": { "C_B1": 1 }, "1605": { "C_B1": 1 }, "1606": { "C_B1": 1 },
    "1508": { "C_B2": 1 }, "1510": { "C_B2": 1 }, "1511": { "C_B2": 1 }, "1607": { "C_B2": 1 },
    "1608": { "I_BM": 1 }, "1512": { "I_BM": 1 },
    "1517": { "C_B3": 1, "1519": 1 }, "1519": { "1517": 1 }
};

// 2. SISTEMA VIRTUAL DE COORDENADAS (Grid X e Y)
// Corrigido com base nas posições reais dos elementos SVG do mapa
const coords = {
    // Nós de interseção e corredores — posicionados nos eixos dos corredores reais
    "I_TL":  {x: 215,  y: 384},  // Interseção Noroeste (corredor topo x corredor esquerdo)
    "C_T1":  {x: 435,  y: 384},  // Corredor Norte (A) — entre salas 1101/1102 e 1203/1204
    "C_T2":  {x: 680,  y: 384},  // Corredor Norte (B) — entre salas 1103/1104 e 1205/1206
    "C_T3":  {x: 920,  y: 384},  // Corredor Norte (C) — entre salas 1105/1106 e 1207
    "I_TM":  {x: 1189, y: 384},  // Interseção Principal de Entrada
    "C_T4":  {x: 1460, y: 384},  // Corredor Nordeste — entre salas 1107/1108
    "C_T5":  {x: 1653, y: 384},  // Corredor Nordeste — entre salas 1109/1110/1214
    "C_T6":  {x: 1900, y: 412},  // Final do Corredor Nordeste — salas 1117/1216
    "C_L1":  {x: 215,  y: 521},  // Corredor Oeste (trecho 1200)
    "I_ML":  {x: 215,  y: 858},  // Interseção Centro-Oeste
    "C_L2":  {x: 215,  y: 1317}, // Corredor Oeste (trecho 1500)
    "I_BL":  {x: 215,  y: 1646}, // Interseção Sudoeste
    "C_M1":  {x: 450,  y: 858},  // Corredor Central (acesso 1400)
    "C_C1":  {x: 1189, y: 248},  // Corredor Norte-Centro (entrada principal)
    "I_MM":  {x: 1189, y: 991},  // Interseção Central do Pátio
    "C_C2":  {x: 1189, y: 1363}, // Corredor Centro-Sul
    "C_B1":  {x: 600,  y: 1646}, // Corredor Sul (trecho 1505-1507/1605-1606)
    "C_B2":  {x: 900,  y: 1646}, // Corredor Sul (trecho 1508-1511/1607)
    "I_BM":  {x: 1189, y: 1646}, // Interseção Principal Sul
    "C_B3":  {x: 1462, y: 1646}, // Acesso Leste (1517)

    // Salas — centro geométrico calculado a partir dos retângulos do SVG
    "1100": {x: 190,  y: 302},
    "1101": {x: 353,  y: 302},
    "1102": {x: 516,  y: 302},
    "1103": {x: 679,  y: 302},
    "1104": {x: 787,  y: 302},
    "1105": {x: 853,  y: 302},
    "1106": {x: 1015, y: 302},
    "1107": {x: 1437, y: 301},
    "1108": {x: 1546, y: 301},
    "1109": {x: 1653, y: 302},
    "1110": {x: 1815, y: 302},
    "1117": {x: 1947, y: 330},
    "1200": {x: 189,  y: 521},
    "1203": {x: 393,  y: 494},
    "1204": {x: 515,  y: 494},
    "1205": {x: 638,  y: 494},
    "1206": {x: 761,  y: 494},
    "1207": {x: 976,  y: 494},
    "1211": {x: 1438, y: 494},
    "1212": {x: 1585, y: 494},
    "1214": {x: 1775, y: 494},
    "1216": {x: 1775, y: 615},
    "1400": {x: 507,  y: 1097},
    "1413": {x: 1570, y: 945},
    "1417": {x: 1718, y: 1107},
    "1500": {x: 190,  y: 1317},
    "1504": {x: 326,  y: 1758},
    "1505": {x: 473,  y: 1536},
    "1506": {x: 611,  y: 1536},
    "1507": {x: 692,  y: 1536},
    "1508": {x: 799,  y: 1536},
    "1510": {x: 922,  y: 1536},
    "1511": {x: 1004, y: 1536},
    "1512": {x: 1218, y: 1473},
    "1517": {x: 1598, y: 1620},
    "1519": {x: 1731, y: 1639},
    "1605": {x: 623,  y: 1729},
    "1606": {x: 761,  y: 1729},
    "1607": {x: 895,  y: 1729},
    "1608": {x: 1462, y: 1729},
};

const namesMap = {
    "I_TL": "Interseção Noroeste", "C_T1": "Corredor Norte (A)", "C_T2": "Corredor Norte (B)", "C_T3": "Corredor Norte (C)",
    "I_TM": "Interseção Principal de Entrada", "C_T4": "Corredor Nordeste", "C_T5": "Corredor Nordeste", "C_T6": "Final do Corredor Nordeste",
    "C_L1": "Corredor Oeste", "I_ML": "Interseção Centro-Oeste", "C_L2": "Corredor Oeste",
    "C_M1": "Corredor Central", "C_C1": "Corredor Norte-Centro", "I_MM": "Interseção Central do Pátio", "C_C2": "Corredor Centro-Sul",
    "I_BL": "Interseção Sudoeste", "C_B1": "Corredor Sul", "C_B2": "Corredor Sul",
    "I_BM": "Interseção Principal Sul", "C_B3": "Acesso Leste"
};

// 3. INIT DA INTERFACE
document.addEventListener("DOMContentLoaded", () => {
    const originSelect = document.getElementById("origin");
    const destSelect = document.getElementById("destination");
    const rooms = Object.keys(graph).filter(node => !isNaN(node)).sort();

    rooms.forEach(room => {
        originSelect.appendChild(new Option(`Sala ${room}`, room));
        destSelect.appendChild(new Option(`Sala ${room}`, room));
    });
});

// 4. DIJKSTRA
function dijkstra(graph, startNode, endNode) {
    let distances = {}; let prev = {}; let pq = [];
    for (let node in graph) { distances[node] = Infinity; prev[node] = null; }
    distances[startNode] = 0; pq.push({ node: startNode, dist: 0 });

    while (pq.length > 0) {
        pq.sort((a, b) => a.dist - b.dist);
        let curr = pq.shift(); let currNode = curr.node;
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
    let path = []; let u = endNode;
    if (prev[u] !== null || u === startNode) {
        while (u !== null) { path.unshift(u); u = prev[u]; }
    }
    return path;
}

// 5. MOTOR DE GEOMETRIA (Produto Vetorial)
function getTurnDirection(nodeA, nodeB, nodeC) {
    let a = coords[nodeA], b = coords[nodeB], c = coords[nodeC];
    if (!a || !b || !c) return null;

    let AB = { x: b.x - a.x, y: b.y - a.y };
    let BC = { x: c.x - b.x, y: c.y - b.y };
    
    let crossProduct = (AB.x * BC.y) - (AB.y * BC.x);

    // Em SVG, o eixo Y cresce para BAIXO, então o sinal do produto vetorial é invertido
    // em relação ao sistema cartesiano padrão.
    if (crossProduct > 0) return "esquerda";
    if (crossProduct < 0) return "direita";
    return "em frente";
}

function addListItem(text, className = '') {
    const list = document.getElementById("instructions-list");
    const li = document.createElement("li");
    li.innerHTML = text;
    if (className) li.classList.add(className);
    list.appendChild(li);
}

// 6. GERADOR DE INSTRUÇÕES (Tradutor Humanizado)
function generateInstructions(path) {
    const list = document.getElementById("instructions-list");
    list.innerHTML = "";

    if (path.length === 0) return addListItem("<li>Não foi possível encontrar um caminho.</li>");
    if (path.length === 1) return addListItem("<li>Você já está no seu destino.</li>");

    for (let i = 0; i < path.length - 1; i++) {
        let node = path[i];
        let nextNode = path[i+1];
        let prevNode = i > 0 ? path[i-1] : null;

        if (node === "1517" && nextNode === "1519") {
            addListItem(`<strong>Atenção:</strong> Atravesse a Sala 1517 para conseguir acessar a Sala 1519.`, 'golden-rule');
            continue;
        }
        if (prevNode === "1517" && node === "1519") continue;

        if (i === 0) {
            let turnText = "siga em frente";
            if (path.length > 2) {
                let dir = getTurnDirection(node, nextNode, path[2]);
                if (dir === "direita" || dir === "esquerda") turnText = `vire à <strong>${dir}</strong>`;
            }
            addListItem(`Saia da Sala ${node} e ${turnText} no corredor.`);
        } 
        else if (i < path.length - 1 && prevNode) {
            let dir = getTurnDirection(prevNode, node, nextNode);

            if (dir === "direita" || dir === "esquerda") {
                if (!isNaN(nextNode)) {
                    addListItem(`A Sala ${nextNode} estará à sua <strong>${dir}</strong>. Entre nela.`);
                } else {
                    let friendlyName = namesMap[node] || "corredor";
                    addListItem(`Chegando na ${friendlyName}, vire à <strong>${dir}</strong>.`);
                }
            } else if (dir === "em frente" && node.startsWith("I_")) {
                 let friendlyName = namesMap[node] || "interseção";
                 addListItem(`Siga em frente passando pela ${friendlyName}.`);
            }
        }
    }
    addListItem(`Você chegou ao seu destino: <strong>Sala ${path[path.length - 1]}</strong>! 🎉`);
}

// 8. DESENHADOR DE ROTAS NO SVG
function drawRouteOnMap(path) {
    const routeLayer = document.getElementById("route-layer");
    
    if (!routeLayer) {
        console.error("ERRO: A tag <g id='route-layer'></g> não foi encontrada no seu HTML antes do </svg>.");
        return;
    }
    
    routeLayer.innerHTML = ""; 

    if (path.length < 2) return;

    let pathData = "M "; 
    
    path.forEach((node, index) => {
        const point = coords[node];
        if (point) {
            pathData += `${point.x} ${point.y} `;
            if (index < path.length - 1) pathData += "L ";
        }
    });

    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", pathData);
    svgPath.setAttribute("class", "animated-route");

    routeLayer.appendChild(svgPath);
}

// 7. EVENTOS
document.getElementById("route-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const origin = document.getElementById("origin").value;
    const dest = document.getElementById("destination").value;

    if (origin === dest) {
        alert("A origem e o destino são iguais!");
        return;
    }

    const shortestPath = dijkstra(graph, origin, dest);
    const resultCard = document.getElementById("result-card");
    
    resultCard.classList.remove("hidden");
    resultCard.style.animation = 'none';
    resultCard.offsetHeight; 
    resultCard.style.animation = null;

    generateInstructions(shortestPath);
    drawRouteOnMap(shortestPath); 
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// 🛠️ FERRAMENTA DE MAPEAMENTO (À Prova de Falhas)
window.addEventListener("load", () => {
    const mapaSvg = document.getElementById("campus-map") || document.querySelector("svg");
    
    if (mapaSvg) {
        mapaSvg.addEventListener("click", function(e) {
            const svg = this;
            const pt = svg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
            
            const x = Math.round(svgP.x);
            const y = Math.round(svgP.y);
            
            console.log(`{x: ${x}, y: ${y}},`);
            alert(`X: ${x} | Y: ${y}`);
        });
        console.log("✅ Modo Hacker ativado! Clique no mapa.");
    } else {
        alert("❌ Erro: O SVG do mapa não foi encontrado no HTML.");
    }
});
