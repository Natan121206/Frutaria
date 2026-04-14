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
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // Calcula o total para exibir na tela de pagamento
    let somaTotal = 0;
    carrinho.forEach(f => somaTotal += f.preco);
    
    // Salva o valor formatado para a próxima tela ler
    localStorage.setItem('valorTotal', somaTotal.toFixed(2).replace('.', ','));

    // Redireciona para a tela de pagamento
    window.location.href = "pagamento.html";
}

let taxaEntrega = 0; // Começa em zero

function calcularFrete() {
    const cep = document.getElementById('cep-input').value;
    const msgFrete = document.getElementById('msg-frete');

    if (cep.length >= 8) {
        taxaEntrega = 5.00; // Valor fixo da entrega
        msgFrete.innerText = "Taxa de entrega: R$ 5,00 (Prazo: 40 min)";
        msgFrete.style.display = "block";
        msgFrete.style.color = "#27ae60";
        
        // Atualiza a visualização do total somando o frete
        exibirCarrinho(); 
    } else {
        alert("Por favor, digite um CEP válido.");
    }
}

// Atualize sua função exibirCarrinho para incluir a taxa
function exibirCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    listaCarrinho.innerHTML = "";
    let somaProdutos = 0;

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = "<p style='text-align:center;'>Seu carrinho está vazio. 🛒</p>";
        totalElemento.innerText = "Total: R$ 0,00";
        return;
    }

    carrinho.forEach((fruta, index) => {
        somaProdutos += fruta.preco;
        const item = `
            <div style="display: flex; justify-content: space-between; align-items: center; background: white; padding: 15px; margin-bottom: 10px; border-radius: 10px; border: 1px solid #eee;">
                <img src="imagens/${fruta.imagem}" style="width: 50px; border-radius: 5px;">
                <strong>${fruta.titulo}</strong>
                <span>R$ ${fruta.preco.toFixed(2).replace('.', ',')}</span>
                <button onclick="removerItem(${index})" style="color: #e74c3c; border: none; background: none; cursor: pointer; font-weight: bold;">Remover</button>
            </div>
        `;
        listaCarrinho.innerHTML += item;
    });

    const totalFinal = somaProdutos + taxaEntrega;
    
    // Atualiza o texto do total mostrando o frete se ele existir
    if (taxaEntrega > 0) {
        totalElemento.innerHTML = `
            <div style="font-size: 1rem; color: #666; font-weight: normal;">Produtos: R$ ${somaProdutos.toFixed(2).replace('.', ',')}</div>
            <div style="font-size: 1rem; color: #666; font-weight: normal;">Entrega: R$ ${taxaEntrega.toFixed(2).replace('.', ',')}</div>
            <div style="margin-top: 10px;">Total: R$ ${totalFinal.toFixed(2).replace('.', ',')}</div>
        `;
    } else {
        totalElemento.innerText = `Total: R$ ${somaProdutos.toFixed(2).replace('.', ',')}`;
    }

    // Salva o valor final para a tela de pagamento
    localStorage.setItem('valorTotal', totalFinal.toFixed(2).replace('.', ','));
}

// Inicia a tela
exibirCarrinho();