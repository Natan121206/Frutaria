const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;

// Middlewares
app.use(cors()); 
app.use(express.json()); 

const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || "mongodb+srv://Dev:Dev123@cluster0.opt3avr.mongodb.net/frutaria_db?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
    tlsAllowInvalidCertificates: true, // Tenta ignorar o erro de certificado SSL
    tlsAllowInvalidHostnames: true
})
.then(() => console.log("✅ Conectado com sucesso!"))
.catch((err) => console.error("❌ Erro:", err));

// Criando o "Modelo" da Fruta (como os dados serão salvos)
const FrutaSchema = new mongoose.Schema({
    titulo: String,
    preco: Number,
    imagem: String,
    descricao: String
});

const Fruta = mongoose.model('Fruta', FrutaSchema);

// ROTA PARA LISTAR FRUTAS (GET)
app.get('/frutas', async (req, res) => {
    try {
        const listaDeFrutas = await Fruta.find(); // Busca tudo no banco
        res.json(listaDeFrutas);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar frutas" });
    }
});

// ROTA PARA CADASTRAR NOVA FRUTA (POST)
app.post('/frutas', async (req, res) => {
    try {
        const novaFruta = new Fruta(req.body); // Cria baseado no que veio do Postman
        await novaFruta.save(); // Salva no banco
        res.status(201).json(novaFruta);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao salvar fruta" });
    }
});
// Inicialização
app.listen(port, () => {
    console.log(`🍎 Servidor da Frutaria ON em http://localhost:${port}`);
});