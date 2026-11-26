require('dotenv').config(); // Carrega as variáveis do arquivo .env para o process.env
const express = require('express');
const app = express();
const routes = require('./routes'); // importa automaticamente todas as rotas do arquivo routes/index.js
const prisma = require('../database/prisma');
app.use(express.json());
app.use(routes); // usa as rotas importadas do arquivo routes/index.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);

    try {
        await prisma.$connect();
        console.log('🗄️  Conectado ao banco de dados MySQL com sucesso!');
    } catch (error) {
        console.error('❌ Falha ao conectar no MySQL. Verifique se o serviço está ligado!');
        console.error(error.message);
    }
})
//nao precisei mexer aqui depois de add os users!!!!