
const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

//Rota POST
//produto/novo
router.post('/novo', produtoController.criarProduto);
//Rota GET
//produto/listarTodos
router.get('/listarTodos', produtoController.listarProdutos);
//Rota GET
//produto/listarPorCodigo/:codigo
router.get('/listarPorCodigo/:codigo', produtoController.listarProdutoPorCodigo);
router.put('/atualizar/:codigo', produtoController.atualizar);
router.delete('/excluir/:codigo', produtoController.excluir);

module.exports = router;
