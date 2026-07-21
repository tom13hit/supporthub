const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const ticketController = require('../controllers/ticketController');

const authController = require('../controllers/authController');

router.post('/ticket', authMiddleware, ticketController.criarTicket);

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

router.get('/ticket', authMiddleware, (req, res) => {

    res.render('cliente/ticket', {
        usuario: req.session.usuario
    });

});

router.post('/ticket', authMiddleware, ticketController.criarTicket);

module.exports = router;

router.get('/dashboard', authMiddleware, (req, res) => {

    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    res.render('cliente/dashboard', {
        usuario: req.session.usuario
    });

});