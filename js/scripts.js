// ======================================================
// JOGO DA MEMÓRIA
// ======================================================

// Cartões do tabuleiro
const cartoes = document.querySelectorAll('.memory-card');

// Variáveis do jogo
let primeiraCarta = null;
let segundaCarta = null;
let podeClicar = true;
let paresEncontrados = 0;

const totalDePares = cartoes.length / 2;

// Elemento do tempo
const timerElement = document.querySelector('#timer');

// Botão de iniciar
const botaoIniciar = document.querySelector('#start');

// ======================================================
// VARIÁVEIS DO RELÓGIO
// ======================================================

let segundosPassados = 0;
let temporizador = null;


// ======================================================
// INICIAR RELÓGIO
// ======================================================

function iniciarTemporizador() {

    // Para qualquer relógio que já esteja rodando
    clearInterval(temporizador);

    // Começa em zero
    segundosPassados = 0;

    // Mostra 00:00
    timerElement.textContent = '00:00';

    // Começa a contar
    temporizador = setInterval(function() {

        segundosPassados++;

        // Calcula os minutos
        const minutos = Math.floor(segundosPassados / 60);

        // Calcula os segundos
        const segundos = segundosPassados % 60;

        // Formata com dois números
        const minutosFormatados = String(minutos).padStart(2, '0');
        const segundosFormatados = String(segundos).padStart(2, '0');

        // Mostra o tempo
        timerElement.textContent =
            minutosFormatados + ':' + segundosFormatados;

    }, 1000);
}


// ======================================================
// PARAR RELÓGIO
// ======================================================

function pararTemporizador() {

    clearInterval(temporizador);

    temporizador = null;
}


// ======================================================
// VIRAR CARTA
// ======================================================

function virarCarta() {

    if (!podeClicar) return;

    if (this === primeiraCarta) return;

    this.classList.add('flip');

    if (primeiraCarta === null) {

        primeiraCarta = this;

        return;
    }

    segundaCarta = this;

    verificarPar();
}


// ======================================================
// VERIFICAR SE É UM PAR
// ======================================================

function verificarPar() {

    const cartasIguais =
        primeiraCarta.dataset.framework ===
        segundaCarta.dataset.framework;

    if (cartasIguais) {

        manterParEncontrado();

    } else {

        desvirarCartas();
    }
}


// ======================================================
// MANTER PAR ENCONTRADO
// ======================================================

function manterParEncontrado() {

    primeiraCarta.removeEventListener(
        'click',
        virarCarta
    );

    segundaCarta.removeEventListener(
        'click',
        virarCarta
    );

    paresEncontrados++;

    resetarJogada();

    if (paresEncontrados === totalDePares) {

        fimDeJogo();
    }
}


// ======================================================
// DESVIRAR CARTAS
// ======================================================

function desvirarCartas() {

    podeClicar = false;

    setTimeout(function() {

        primeiraCarta.classList.remove('flip');

        segundaCarta.classList.remove('flip');

        resetarJogada();

    }, 1500);
}


// ======================================================
// RESETAR JOGADA
// ======================================================

function resetarJogada() {

    primeiraCarta = null;

    segundaCarta = null;

    podeClicar = true;
}


// ======================================================
// EMBARALHAR CARTAS
// ======================================================

function embaralharCartas() {

    cartoes.forEach(function(card) {

        const posicaoAleatoria =
            Math.floor(
                Math.random() * cartoes.length
            );

        card.style.order = posicaoAleatoria;
    });
}


// ======================================================
// FIM DO JOGO
// ======================================================

function fimDeJogo() {

    // Para o relógio
    pararTemporizador();

    alert(
        'Parabéns! Você encontrou todos os pares em ' +
        timerElement.textContent +
        '!'
    );

    resetarTabuleiro();
}


// ======================================================
// RESETAR TABULEIRO
// ======================================================

function resetarTabuleiro() {

    paresEncontrados = 0;

    primeiraCarta = null;

    segundaCarta = null;

    podeClicar = true;

    cartoes.forEach(function(card) {

        card.classList.remove('flip');

        card.addEventListener(
            'click',
            virarCarta
        );
    });

    embaralharCartas();
}


// ======================================================
// BOTÃO INICIAR
// ======================================================

botaoIniciar.addEventListener('click', function() {

    resetarTabuleiro();

    iniciarTemporizador();

});


// ======================================================
// PREPARAR CARTAS
// ======================================================

embaralharCartas();

cartoes.forEach(function(card) {

    card.addEventListener(
        'click',
        virarCarta
    );

});
