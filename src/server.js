require('dotenv').config(); // Carrega as variáveis do arquivo .env para o process.env
const express = require('express');
const cpfController = require('./cpfController.controller');
const app = express();
const routes = require('./routes/routes'); // importa automaticamente todas as rotas do arquivo routes.js
app.use(express.json());
app.use(routes); // usa as rotas importadas do arquivo routes.js


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);

})