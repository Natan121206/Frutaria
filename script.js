const containerFrutas = document.querySelector('.container-frutas');
const contadorElemento = document.getElementById('contador-carrinho');
const API_URL = 'https://frutaria-api.onrender.com/frutas';
const nivel = localStorage.getItem('nivelAcesso');
const nav = document.querySelector('nav');

if (nivel === 'admin') {
    // Cria um link extra no menu se for admin
    const linkAdmin = document.createElement('a');
    linkAdmin.href = "admin.html";
    linkAdmin.innerText = "⚙️ Painel Admin";
    linkAdmin.style.color = "#f39c12"; // Cor de destaque
    nav.appendChild(linkAdmin);
}

// --- NOVA FUNÇÃO: Atualiza o número no contador vermelho ---
function atualizarContador() {
    // 1. Lê o carrinho do localStorage
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const quantidadeItems = carrinho.length;

    // 2. Se tiver itens, mostra o contador vermelho
    if (quantidadeItems > 0) {
        contadorElemento.innerText = quantidadeItems;
        contadorElemento.style.display = 'flex'; // Mostra o círculo
    } else {
        // Se estiver vazio, esconde o contador
        contadorElemento.style.display = 'none'; // Esconde o círculo
    }
}


async function carregarFrutas() {
    try {
        const resposta = await fetch(`${API_URL}/frutas`);
        const dados = await resposta.json();

        containerFrutas.innerHTML = "";

        dados.forEach(fruta => {
            const card = `
                <div class="card-fruta">
                    <img src="imagens/${fruta.imagem}" alt="${fruta.titulo}" class="img-fruta">
                    <h3>${fruta.titulo}</h3>
                    <p>${fruta.descricao}</p>
                    <span class="preco">R$ ${fruta.preco.toFixed(2).replace('.', ',')}</span>
                    <button class="btn-comprar" onclick="adicionarAoCarrinho(${JSON.stringify(fruta).replace(/"/g, '&quot;')})">
                        Adicionar ao Carrinho
                    </button>
                </div>
            `;
            containerFrutas.innerHTML += card;
        });
    } catch (erro) {
        console.error("Erro ao carregar vitrine:", erro);
    }
}

// Inicia o contador assim que a página abre
atualizarContador();
carregarFrutas();