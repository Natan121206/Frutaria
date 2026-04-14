const mongoose = require('mongoose');

// Exemplo de como deve ficar (a sua string será mais longa):
const uri = "mongodb://Dev:Senha123@cluster0-shard-00-00.opt3avr.mongodb.net:27017,cluster0-shard-00-01.opt3avr.mongodb.net:27017,cluster0-shard-00-02.opt3avr.mongodb.net:27017/frutaria_db?ssl=true&replicaSet=atlas-xxxxxx-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000, // Dá 5 segundos para tentar conectar
    tls: true,                     // Garante que o SSL está ligado
    // Se o erro de SSL persistir, adicione estas duas linhas:
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true
})
.then(() => console.log("✅ CONEXÃO ESTABELECIDA!"))
.catch((err) => {
    console.error("❌ ERRO DETALHADO:", err.message);
});