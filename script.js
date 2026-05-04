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
// AVISO: Estas coordenadas foram multiplicadas por 10 para o teste visual.
// Depois você ajustará com os números finais copiados do Inkscape!
const coords = {
<<<<<<< HEAD
    "I_TL": {x: 290, y: 391}, "C_T1": {x: 433, y: 381}, "C_T2": {x: 759, y: 381}, "C_T3": {x: 843, y: 381}, "I_TM": {x: 1166, y: 381}, "C_T4": {x: 1386, y: 381}, "C_T5": {x: 1733, y: 381}, "C_T6": {x: 1873, y: 381},
    "C_L1": {x: 293, y: 521}, "I_ML": {x: 284, y: 936}, "C_L2": {x: 284, y: 953}, "I_BL": {x: 284, y: 1466},
    "C_M1": {x: 577, y: 932}, "C_C1": {x: 1166, y: 66}, "I_MM": {x: 1166, y: 991}, "C_C2": {x: 1166, y: 1364},
    "C_B1": {x: 708, y: 1648}, "C_B2": {x: 962, y: 1648}, "I_BM": {x: 1161, y: 1648}, "C_B3": {x: 1479, y: 1648},
    // Posições espaciais das Salas
    "1100": {x: 185, y: 320}, "1101": {x: 345, y: 320}, "1102": {x: 513, y: 320}, "1203": {x: 397, y: 436}, "1204": {x: 392, y: 436},
    "1103": {x: 681, y: 320}, "1104": {x: 783, y: 320}, "1205": {x: 625, y: 436}, "1206": {x: 764, y: 436},
    "1105": {x: 861, y: 320}, "1106": {x: 1018, y: 320}, "1207": {x: 965, y: 436}, 
    "1107": {x: 1437, y: 320}, "1108": {x: 1536, y: 320}, "1109": {x: 1649, y: 320}, "1110": {x: 1815, y: 320}, "1214": {x: 1779, y: 436},
    "1117": {x: 1900, y: 383}, "1212": {x: 1583, y: 436}, "1211": {x: 1451, y: 436}, "1216": {x: 800, y: 550},
    "1200": {x: 254, y: 516}, "1500": {x: 254, y: 1321}, "1504": {x: 521, y: 1646},
    "1400": {x: 676, y: 1026}, "1413": {x: 1371, y: 968}, "1417": {x: 1677, y: 1106},
    "1505": {x: 552, y: 1605}, "1506": {x: 692, y: 1600}, "1507": {x: 805, y: 1591}, "1605": {x: 770, y: 1682}, "1606": {x: 888, y: 1682}, "1516": {x: 1484, y: 1594},
    "1508": {x: 924, y: 1580}, "1510": {x: 1009, y: 1580}, "1511": {x: 1084, y: 1580},  "1515": {x: 1412, y: 1596}, "1607": {x: 1018, y: 1682},
    "1512": {x: 1194, y: 1467}, "1608": {x: 1382, y: 1685},
    "1517": {x: 1533, y: 1649}, "1519": {x: 1704, y: 1627}
=======
    "I_TL": {x: 100, y: 100}, "C_T1": {x: 200, y: 100}, "C_T2": {x: 300, y: 100}, "C_T3": {x: 400, y: 100}, "I_TM": {x: 500, y: 100}, "C_T4": {x: 600, y: 100}, "C_T5": {x: 700, y: 100}, "C_T6": {x: 800, y: 100},
    "C_L1": {x: 100, y: 200}, "I_ML": {x: 100, y: 300}, "C_L2": {x: 100, y: 400}, "I_BL": {x: 100, y: 500},
    "C_M1": {x: 300, y: 300}, "C_C1": {x: 500, y: 200}, "I_MM": {x: 500, y: 300}, "C_C2": {x: 500, y: 400},
    "C_B1": {x: 200, y: 500}, "C_B2": {x: 400, y: 500}, "I_BM": {x: 500, y: 500}, "C_B3": {x: 600, y: 500},
    // Posições espaciais das Salas
    "1100": {x: 100, y: 50}, "1101": {x: 200, y: 50}, "1102": {x: 250, y: 50}, "1203": {x: 200, y: 150}, "1204": {x: 250, y: 150},
    "1103": {x: 300, y: 50}, "1104": {x: 350, y: 50}, "1205": {x: 300, y: 150}, "1206": {x: 350, y: 150},
    "1105": {x: 400, y: 50}, "1106": {x: 450, y: 50}, "1207": {x: 400, y: 150},
    "1107": {x: 600, y: 50}, "1108": {x: 650, y: 50}, "1109": {x: 700, y: 50}, "1110": {x: 750, y: 50}, "1214": {x: 700, y: 150},
    "1117": {x: 800, y: 50}, "1216": {x: 800, y: 150},
    "1200": {x: 50, y: 200}, "1500": {x: 50, y: 400}, "1504": {x: 50, y: 500},
    "1400": {x: 300, y: 350}, "1413": {x: 550, y: 250}, "1417": {x: 550, y: 350},
    "1505": {x: 200, y: 450}, "1506": {x: 250, y: 450}, "1507": {x: 280, y: 450}, "1605": {x: 200, y: 550}, "1606": {x: 250, y: 550},
    "1508": {x: 400, y: 450}, "1510": {x: 430, y: 450}, "1511": {x: 460, y: 450}, "1607": {x: 400, y: 550},
    "1512": {x: 500, y: 450}, "1608": {x: 500, y: 550},
    "1517": {x: 600, y: 450}, "1519": {x: 700, y: 450}
>>>>>>> 4f4618ac9a4129194a5dc609cc325cda8a369b31
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

    if (crossProduct > 0) return "direita";
    if (crossProduct < 0) return "esquerda";
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
    
    // Verificação de segurança caso o <g id="route-layer"> não exista no HTML
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
}); // <-- FECHAMENTO CORRETO DO EVENTO DO BOTÃO

// 🛠️ FERRAMENTA DE MAPEAMENTO (À PROVA DE FALHAS)
window.addEventListener("load", () => {
    // Procura o SVG direto, com ou sem ID
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
<<<<<<< HEAD
    }
=======
    }
});
>>>>>>> 4f4618ac9a4129194a5dc609cc325cda8a369b31
