const listaCarrinho = document.getElementById('lista-carrinho');
const totalElemento = document.getElementById('total-carrinho');

function exibirCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    listaCarrinho.innerHTML = "";
    let somaTotal = 0;

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = "<p style='text-align:center;'>Seu carrinho está vazio. 🛒</p>";
        totalElemento.innerText = "Total: R$ 0,00";
        return;
    }

    carrinho.forEach((fruta, index) => {
        somaTotal += fruta.preco;
        const item = `
            <div style="display: flex; justify-content: space-between; align-items: center; background: white; padding: 15px; margin-bottom: 10px; border-radius: 10px; border: 1px solid #eee;">
                <img src="imagens/${fruta.imagem}" style="width: 50px;">
                <strong>${fruta.titulo}</strong>
                <span>R$ ${fruta.preco.toFixed(2).replace('.', ',')}</span>
                <button onclick="removerItem(${index})" style="color: red; border: none; background: none; cursor: pointer;">Excluir</button>
            </div>
        `;
        listaCarrinho.innerHTML += item;
    });

    totalElemento.innerText = `Total: R$ ${somaTotal.toFixed(2).replace('.', ',')}`;
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho.splice(index, 1); // Remove o item pelo índice
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

function limparCarrinho() {
    localStorage.removeItem('carrinho');
    exibirCarrinho();
}

function finalizarCompra() {
    alert("Pedido realizado com sucesso! Em breve você receberá suas frutas.");
    limparCarrinho();
    window.location.href = "vitrine.html";
}

// Inicia a tela
exibirCarrinho();