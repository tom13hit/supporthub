const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/cadastro', authController.cadastro);

router.post('/cadastro', authController.criarUsuario);

module.exports = router;