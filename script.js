let jogador = '';
let simboloJogador = 'X';
let simboloPc = 'O';
let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let jogoAtivo = true;

function play() {
    const nomeInput = document.getElementById('nameUser').value.trim();

    if (nomeInput === '') {
        alert('Digite seu nome para começar o jogo!');
        return;
    }

    jogador = nomeInput;

    document.getElementById('userName').textContent = `Jogador: ${jogador} (X)`;
    document.getElementById('usuario').style.display = 'none';
    document.getElementById('jogo').style.display = 'block';
    document.getElementById('titulo').style.display = 'none';
    document.getElementById('subtitulo').style.display = 'none';

    criarTabuleiro();
}

function criarTabuleiro() {
    const tabuleiroDiv = document.getElementById('tabuleiro');
    tabuleiroDiv.innerHTML = '';

    tabuleiro.forEach((valor, index) => {
        const celula = document.createElement('div');
        celula.classList.add('celula');
        celula.dataset.index = index;
        celula.textContent = valor;
        celula.addEventListener('click', () => jogar(index));
        tabuleiroDiv.appendChild(celula);
    });
}

function jogar(index) {
    if (!jogoAtivo || tabuleiro[index] !== '') return;

    tabuleiro[index] = simboloJogador;
    atualizarTabuleiro();

    if (verificarVitoria(simboloJogador)) {
        exibirMensagem(`${jogador} venceu!`);
        jogoAtivo = false;
        return;
    }

    if (tabuleiroCheio()) {
        exibirMensagem('Empate!');
        jogoAtivo = false;
        return;
    }

    setTimeout(jogadaComputador, 500);
}

function jogadaComputador() {
    if (!jogoAtivo) return;

    console.log('Jogada do computador...');

    let indice;
    do {
        indice = Math.floor(Math.random() * 9);
    } while (tabuleiro[indice] !== '');

    tabuleiro[indice] = simboloPc;
    atualizarTabuleiro();

    if (verificarVitoria(simboloPc)) {
        exibirMensagem('Computador venceu!');
        jogoAtivo = false;
        return;
    }

    if (tabuleiroCheio()) {
        exibirMensagem('Empate!');
        jogoAtivo = false;
    }
}

function atualizarTabuleiro() {
    document.querySelectorAll('.celula').forEach((celula, index) => {
        celula.textContent = tabuleiro[index];
    });
}

function exibirMensagem(msg) {
    const msgDiv  = document.getElementById('msg');
    msgDiv.textContent = msg;

    if(!document.getElementById('btnReiniciar')) {
        const botao = document.createElement('button');
        botao.id = 'btnReiniciar';
        botao.textContent = 'Novo jogo';
        botao.style.marginTop = '10px';
        botao.addEventListener('click', reiniciarJogo);
        msgDiv.appendChild(botao);
    }
}

function reiniciarJogo() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogoAtivo = true;
    document.getElementById('msg').textContent = '';
    criarTabuleiro();
}

function tabuleiroCheio() {
    return tabuleiro.every(c => c !== '');
}

function verificarVitoria(simbolo) {
    const combinacoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return combinacoes.some(comb =>
        comb.every(index => tabuleiro[index] === simbolo)
    );
}
