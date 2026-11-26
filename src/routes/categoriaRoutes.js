const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.post('/novo', categoriaController.criarCategoria);
router.get('/listarTodos', categoriaController.listarCategorias);
router.put('/atualizar/:id', categoriaController.atualizar);
router.delete('/excluir/:id', categoriaController.excluir);

module.exports = router;
