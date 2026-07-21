const db = require('../config/database');

exports.cadastro = (req, res) => {
    res.render('auth/cadastro');
};

exports.criarUsuario = (req, res) => {

    const { nome, email, senha } = req.body;

    const sql = `
        INSERT INTO usuarios (nome, email, senha)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [nome, email, senha], (err, resultado) => {

        if (err) {
            console.log(err);
            return res.send('Erro ao cadastrar usuário');
        }

        res.send('Usuário cadastrado com sucesso!');
    });

};