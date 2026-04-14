const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');

const app = express();
// 1. Porta dinâmica para o Render
const port = process.env.PORT || 3000;

// Middlewares
// Remova todos os app.use(cors()) anteriores e deixe apenas um:
app.use(cors()); 
app.use(express.json());

// Conexão única e limpa
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ CONECTADO AO MONGODB ATLAS!"))
.catch((err) => console.error("❌ ERRO NO BANCO:", err));

const mongoURI = "mongodb+srv://Dev:SenhaSenha@cluster0.ee2o5zl.mongodb.net/?appName=Cluster0";


// Rotas
app.get('/frutas', async (req, res) => {
    try {
        const listaDeFrutas = await Fruta.find();
        res.json(listaDeFrutas);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar frutas" });
    }
});

app.post('/frutas', async (req, res) => {
    try {
        const novaFruta = new Fruta(req.body);
        await novaFruta.save();
        res.status(201).json(novaFruta);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao salvar fruta" });
    }
});

// 4. Escuta em '0.0.0.0' para aceitar conexões externas
app.listen(port, '0.0.0.0', () => {
    console.log(`🍎 Servidor da Frutaria ON em http://localhost:${port}`);
});