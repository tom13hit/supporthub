const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/cadastro', authController.cadastro);

router.post('/cadastro', authController.criarUsuario);

router.get('/login', authController.login);

router.post('/login', authController.fazerLogin);


router.get('/logout', (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            console.log(err);
            return res.send('Erro ao sair');
        }

        res.redirect('/login');

    });

});

module.exports = router;

router.get('/dashboard', (req, res) => {

    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    res.render('cliente/dashboard', {
        usuario: req.session.usuario
    });

});