const containerFrutas = document.querySelector('.container-frutas');
const contadorElemento = document.getElementById('contador-carrinho');

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

// --- FUNÇÃO DE ADICIONAR (REVISADA) ---
function adicionarAoCarrinho(fruta) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(fruta);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // --- ATUALIZA O CONTADOR LOGO APÓS ADICIONAR ---
    atualizarContador(); 

    alert(`${fruta.titulo} adicionado ao carrinho! 🛒`);
}

async function carregarFrutas() {
    try {
        const resposta = await fetch('http://localhost:3000/frutas');
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