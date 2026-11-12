
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//Rota POST
//usuario/criarUsuario
router.post('/criarUsuario', usuarioController.criarUsuario);

//Rota GET
//usuario/listarUsuarios
router.get('/listarUsuarios', usuarioController.listarUsuarios);

module.exports = router;
