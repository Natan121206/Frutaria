const form = document.getElementById('form-cadastro');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome-cadastro').value;
    const email = document.getElementById('email-cadastro').value;
    const senha = document.getElementById('senha-cadastro').value;

    // 1. Pega a lista de usuários já cadastrados ou cria uma vazia
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // 2. Verifica se o e-mail já existe
    const usuarioExiste = usuarios.find(u => u.email === email);
    if (usuarioExiste) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    // 3. Adiciona o novo usuário na lista
    usuarios.push({ nome, email, senha });

    // 4. Salva de volta no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("Conta criada com sucesso! Agora você pode fazer login.");
    window.location.href = "index.html"; // Volta para a tela de login (que agora é o seu index)
});