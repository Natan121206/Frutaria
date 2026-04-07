const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Substitua sua lista de frutas por esta:
let frutas = [
    { id: 1, titulo: "Morango", preco: 12.90, imagem: "morango.jpg", descricao: "Bandeja 250g" },
    { id: 2, titulo: "Banana Nanica", preco: 6.50, imagem: "BananaNanica.jpg", descricao: "Dúzia selecionada" },
    { id: 3, titulo: "Manga Palmer", preco: 5.00, imagem: "mangaPalmer.jpg", descricao: "Unidade madura" },
    { id: 4, titulo: "Uva sem Semente", preco: 15.00, imagem: "uva.jpg", descricao: "Cacho 500g" },
    { id: 5, titulo: "Abacaxi Pérola", preco: 8.90, imagem: "abacaxi.jpg", descricao: "Unidade grande" },
    { id: 6, titulo: "Maçã Gala", preco: 9.00, imagem: "maca.jpg", descricao: "Pacote 1kg" },
    { id: 7, titulo: "Melancia", preco: 18.00, imagem: "melancia.jpg", descricao: "Unidade inteira" },
    { id: 8, titulo: "Kiwi Importado", preco: 14.50, imagem: "kiwi.jpg", descricao: "Caixa 300g" }
];

// --- ROTA DE BUSCA E LISTAGEM (GET) ---
// No Postman: GET http://localhost:3000/frutas
// Para buscar: GET http://localhost:3000/frutas?nome=banana
app.get('/frutas', (req, res) => {
    res.json(frutas);
});

// --- ROTA DE CADASTRO (POST) ---
// No Postman: POST http://localhost:3000/frutas
// Body -> raw -> JSON
app.post('/frutas', (req, res) => {
    const { titulo, preco, emoji, descricao } = req.body;

    // Validação de campos obrigatórios
    if (!titulo || !preco || !emoji) {
        return res.status(400).json({ erro: "Título, preço e emoji são obrigatórios!" });
    }

    const novaFruta = {
        id: frutas.length + 1,
        titulo,
        preco: parseFloat(preco),
        emoji,
        descricao: descricao || "Fruta fresca"
    };

    frutas.push(novaFruta);
    res.status(201).json(novaFruta);
});

// Inicialização
app.listen(port, () => {
    console.log(`🍎 Servidor da Frutaria ON em http://localhost:${port}`);
});