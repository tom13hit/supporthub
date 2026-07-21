module.exports = (req, res, next) => {

    if (!req.session.usuario) {
        return res.redirect('/login');
    }


    if (req.session.usuario.tipo !== 'admin') {
        return res.send('Acesso negado');
    }


    next();

};