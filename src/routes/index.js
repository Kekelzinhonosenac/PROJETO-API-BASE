const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');
//associa o prefixo /produtos a todas as rotas do arquivo produtoRoutes.js
router.use('/produtos', produtoRoutes);
//associação com a rota /usuario
const usuarioRoutes = require('./usuarioRoutes');
router.use('/usuario', usuarioRoutes);
module.exports = router;