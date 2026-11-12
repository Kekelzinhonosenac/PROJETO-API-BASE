const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController.controller');

//Rota POST
//produto/novo
router.post('/novo', produtoController.criarProduto);
//Rota GET
//produto/listar
router.get('/listar', produtoController.listarProdutos);
//Rota GET
//produto/listar/:id
router.get('/listar/:id', produtoController.listarProdutoPorCodigo);

module.exports = router;