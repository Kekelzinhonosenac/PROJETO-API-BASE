const express = require('express');
const router = express.Router();
const produtoRoutes = require('./produtoRoutes');
const usuarioRoutes = require('./usuarioRoutes'); //associa o prefixo /usuario a todas as rotas do arquivo usuarioRoutes.js
//associa o prefixo /produtos a todas as rotas do arquivo produtoRoutes.js
router.use('/produtos', produtoRoutes);
//associação com a rota /usuario
router.use('/usuario', usuarioRoutes);

module.exports = router; 