const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');

const app = express();
// 1. Porta dinâmica para o Render
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Remova o "+srv" e deixe apenas "mongodb://"
// O host é apenas o endereço do seu cluster, sem o "cluster0." inicial se necessário
const mongoURI = "mongodb://Dev:Senha123@cluster0-ee2o5zl.mongodb.net:27017/frutaria_db?authSource=admin&retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
    // Estas opções não são mais necessárias e causam erro
    // useNewUrlParser: true, 
    // useUnifiedTopology: true,
    
    // Mantemos apenas as configurações de segurança de rede/SSL
    tls: true,
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true
})
.then(() => console.log("✅ CONECTADO COM SUCESSO!"))
.catch((err) => console.error("❌ ERRO NO BANCO:", err));

// 3. Conexão robusta
mongoose.connect(mongoURI, {
    family: 4 // Mantido para ajudar na resolução de IP local
})
.then(() => console.log("✅ Conectado ao banco de dados!"))
.catch((err) => console.error("❌ Erro no banco:", err));

// Schema e Model
const FrutaSchema = new mongoose.Schema({
    titulo: String,
    preco: Number,
    imagem: String,
    descricao: String
});

const Fruta = mongoose.model('Fruta', FrutaSchema);

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