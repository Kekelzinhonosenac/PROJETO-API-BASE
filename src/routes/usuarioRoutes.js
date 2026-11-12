const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//Rota POST
//usuario/criarUsuario
router.post('/criarUsuario', usuarioController.criarUsuario);
router.get('/listarUsuarios', usuarioController.listarUsuarios);

module.exports = router;