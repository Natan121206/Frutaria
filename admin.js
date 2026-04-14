document.getElementById('form-admin').addEventListener('submit', async (e) => {
    e.preventDefault();

    // O "Segurança" da página
function verificarPermissao() {
    const nivel = localStorage.getItem('nivelAcesso');
    const logado = localStorage.getItem('logado');

    if (logado !== 'true' || nivel !== 'admin') {
        alert("Acesso negado! Você não tem permissão para acessar esta página.");
        window.location.href = "vitrine.html"; // Expulsa o usuário comum
    }
}

// Executa a verificação assim que a página carrega
verificarPermissao();

// ... restante do seu código de submit do formulário ...

    const novaFruta = {
        titulo: document.getElementById('titulo').value,
        preco: parseFloat(document.getElementById('preco').value),
        imagem: document.getElementById('imagem').value,
        descricao: document.getElementById('descricao').value
    };

    try {
        const resposta = await fetch('http://localhost:3000/frutas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaFruta)
        });

        if (resposta.ok) {
            alert("Fruta cadastrada com sucesso!");
            document.getElementById('form-admin').reset(); // Limpa o formulário
        } else {
            alert("Erro ao cadastrar. Verifique o servidor.");
        }
    } catch (erro) {
        console.error("Erro na comunicação:", erro);
    }
});