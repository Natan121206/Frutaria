const form = document.getElementById('form-login');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const erro = document.getElementById('mensagem-erro');

// Configuração do "usuário mestre"
const USUARIO_TESTE = "natan@email.com";
const SENHA_TESTE = "123456";

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // --- CORREÇÃO: Extraindo os valores dos inputs aqui ---
    const emailDigitado = emailInput.value;
    const senhaDigitada = senhaInput.value;
    // -----------------------------------------------------

    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // 1. Verificação de Admin (deve vir antes ou ser parte da lógica principal)
    if (emailDigitado === "admin@email.com" && senhaDigitada === "admin123") {
        localStorage.setItem('nivelAcesso', 'admin');
        localStorage.setItem('logado', 'true');
        window.location.href = "vitrine.html";
        return; // 'return' para parar a execução aqui se for admin
    }

    // 2. Verificação de Usuário Comum (Teste ou Cadastro)
    const usuarioEncontrado = usuariosCadastrados.find(u => u.email === emailDigitado && u.senha === senhaDigitada);

    if ((emailDigitado === USUARIO_TESTE && senhaDigitada === SENHA_TESTE) || usuarioEncontrado) {
        localStorage.setItem('logado', 'true');
        window.location.href = "vitrine.html";
    } else {
        // --- CORREÇÃO: Limpando o campo de senha corretamente ---
        erro.style.display = 'block';
        senhaInput.value = ""; // Era 'senha.Imput', corrigido para 'senhaInput.value'
    }
});