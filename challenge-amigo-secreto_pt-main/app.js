const listaDeAmigos = [];
let sorteio = [];
let indiceAtual = 0;

// Mensagens centralizadas para facilitar manutenção
const MENSAGENS = {
    nomeVazio: "Digite um nome válido de um amigo.",
    nomeDuplicado: "Esse nome já foi adicionado, tente diferenciá-lo.",
    poucosNomes: "Adicione pelo menos dois amigos para iniciar o sorteio.",
    fim: "Todos já têm um amigo secreto. Para iniciar um novo jogo, atualize a página.",
    reinicio: "O jogo foi reiniciado. Adicione os nomes novamente."
};

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const inputAmigo = document.getElementById('amigo');

    // Permite adicionar nomes com a tecla Enter
    inputAmigo.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            adicionarAmigo();
            event.preventDefault();
        }
    });

    // Cria botão "Reiniciar jogo" dinamicamente
    const container = document.querySelector('.button-container');
    const btnReiniciar = criarBotao("Reiniciar jogo", reiniciarJogo);
    container.appendChild(btnReiniciar);
});

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();
    const listaHTML = document.getElementById('listaAmigos');

    if (nome === "") {
        alert(MENSAGENS.nomeVazio);
        return;
    }

    if (listaDeAmigos.includes(nome)) {
        alert(MENSAGENS.nomeDuplicado);
        return;
    }

    listaDeAmigos.push(nome);

    const item = document.createElement('li');
    item.textContent = nome;
    listaHTML.appendChild(item);

    input.value = "";
}

function sortearAmigo() {
    if (listaDeAmigos.length < 2) {
        alert(MENSAGENS.poucosNomes);
        return;
    }

    sorteio = embaralharArray([...listaDeAmigos]);

    // Garante que ninguém tire a si mesmo
    for (let i = 0; i < listaDeAmigos.length; i++) {
        if (listaDeAmigos[i] === sorteio[i]) {
            return sortearAmigo();
        }
    }

    indiceAtual = 0;
    document.getElementById('resultado').innerHTML = '';
    criarBotaoRevelar();
}

function criarBotaoRevelar() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = "";

    const nome = listaDeAmigos[indiceAtual];
    const btn = criarBotao(`Ver quem ${nome} tirou`, mostrarPar);

    resultado.appendChild(btn);
}

function mostrarPar() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = "";

    const mensagem = document.createElement('p');
    mensagem.textContent = `${listaDeAmigos[indiceAtual]}, você tirou ${sorteio[indiceAtual]}.`;
    resultado.appendChild(mensagem);

    indiceAtual++;

    if (indiceAtual < listaDeAmigos.length) {
        const btn = criarBotao("Próximo", criarBotaoRevelar);
        resultado.appendChild(btn);
    } else {
        const fim = document.createElement("p");
        fim.textContent = MENSAGENS.fim;
        resultado.appendChild(fim);
    }
}

// Embaralha os nomes para o sorteio
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function reiniciarJogo() {
    listaDeAmigos.length = 0;
    sorteio.length = 0;
    indiceAtual = 0;

    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('amigo').value = '';
    alert(MENSAGENS.reinicio);
}

// Cria botão com texto, ação e estilo aplicado
function criarBotao(texto, aoClicar) {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.className = "button-draw";
    btn.onclick = aoClicar;
    aplicarEstiloBotao(btn);
    return btn;
}

// Aplica estilo direto no botão
function aplicarEstiloBotao(botao) {
    botao.style.textAlign = 'center';
    botao.style.fontFamily = 'Inter, sans-serif';
    botao.style.fontSize = '16px';
    botao.style.fontWeight = '600';
    botao.style.padding = '10px 20px';
    botao.style.border = 'none';
    botao.style.borderRadius = '8px';
    botao.style.backgroundColor = '#5c6bc0';
    botao.style.color = 'white';
    botao.style.margin = '10px auto';
    botao.style.display = 'block';
    botao.style.cursor = 'pointer';
}
