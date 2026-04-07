const form = document.getElementById('form-login');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const erro = document.getElementById('mensagem-erro');

// Configuração do seu "usuário mestre" (Simulando o banco)
const USUARIO_TESTE = "natan@email.com";
const SENHA_TESTE = "123456";

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede a página de recarregar

    const emailDigitado = emailInput.value;
    const senhaDigitada = senhaInput.value;

    // Verificação simples
    if (emailDigitado === USUARIO_TESTE && senhaDigitada === SENHA_TESTE) {
        // Sucesso! Salva que o usuário está logado (opcional)
        localStorage.setItem('logado', 'true');
        
        // Redireciona para a sua página inicial
        window.location.href = "vitrine.html" 
    } else {
        // Falha! Mostra a mensagem de erro
        erro.style.display = 'block';
        senhaInput.value = ""; // Limpa a senha por segurança
    }
});