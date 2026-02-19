// ================================
// script.js - Plataforma Free Fire
// Tema: Neo Vermelho
// ================================

// Função para detectar sistema operacional
function detectarSO() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return "Android";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    return "Desconhecido";
}

// Função para calcular sensibilidade personalizada
function gerarSensibilidade(dpi, estilo) {
    // Base de sensibilidade geral
    let sensibilidade = 120;

    // Ajuste pelo estilo de jogo
    switch (estilo.toLowerCase()) {
        case "rush":
            sensibilidade += 20; // mais ágil
            break;
        case "suporte":
            sensibilidade += 0; // neutro
            break;
        case "sniper":
            sensibilidade -= 10; // mais controle
            break;
        default:
            sensibilidade += 5; // leve ajuste
    }

    // Ajuste pelo DPI
    if (dpi > 520) sensibilidade += 10;
    if (dpi > 600) sensibilidade += 15;

    // Garantir que a sensibilidade fique acima de 100
    if (sensibilidade < 100) sensibilidade = 100;
    if (sensibilidade > 200) sensibilidade = 200;

    return {
        geral: sensibilidade,
        redDot: Math.min(sensibilidade + 25, 200),
        mira2x: Math.min(sensibilidade + 15, 200),
        mira4x: Math.min(sensibilidade + 10, 200),
        awm: Math.max(sensibilidade - 10, 100)
    };
}

// Função para mostrar resultado na tela
function mostrarResultado(config) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `
        <p><strong>Sistema Detectado:</strong> ${detectarSO()}</p>
        <p><strong>Sensibilidade Geral:</strong> ${config.geral}</p>
        <p><strong>Red Dot:</strong> ${config.redDot}</p>
        <p><strong>Mira 2x:</strong> ${config.mira2x}</p>
        <p><strong>Mira 4x:</strong> ${config.mira4x}</p>
        <p><strong>AWM:</strong> ${config.awm}</p>
        <p>🎯 Configuração otimizada para máximo controle e precisão.</p>
    `;
}

// ================================
// EVENTO DO BOTÃO GERAR
// ================================
document.getElementById("gerarBtn").addEventListener("click", () => {
    const dpi = parseInt(document.getElementById("dpi").value);
    const estilo = document.getElementById("estilo").value;

    if (!dpi || dpi < 100) {
        alert("Informe um DPI válido!");
        return;
    }

    const config = gerarSensibilidade(dpi, estilo);
    mostrarResultado(config);
});