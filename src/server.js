require('dotenv').config(); // Carrega as variáveis do arquivo .env para o process.env
const express = require('express');
const app = express();
const routes = require('./routes'); // importa automaticamente todas as rotas do arquivo routes/index.js
app.use(express.json());
app.use(routes); // usa as rotas importadas do arquivo routes/index.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
