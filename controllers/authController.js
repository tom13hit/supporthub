const db = require('../config/database');
const bcrypt = require('bcrypt');

exports.cadastro = (req, res) => {
    res.render('auth/cadastro');
};

exports.criarUsuario = async (req, res) => {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
    return res.send('Preencha todos os campos!');
    }

    if (!email.includes('@') || !email.includes('.')) {
    return res.send('Digite um email válido!');
    }

    if (senha.length < 6) {
    return res.send('A senha precisa ter no mínimo 6 caracteres!');
    }


    const verificarEmail = `
        SELECT * FROM usuarios 
        WHERE email = ?
    `;


    db.query(verificarEmail, [email], async (err, resultado) => {

        if (err) {
            console.log(err);
            return res.send('Erro ao verificar email');
        }


        if (resultado.length > 0) {
            return res.send('Email já cadastrado!');
        }


        const senhaCriptografada = await bcrypt.hash(senha, 10);


        const sql = `
            INSERT INTO usuarios (nome, email, senha)
            VALUES (?, ?, ?)
        `;


        db.query(sql, [nome, email, senhaCriptografada], (err) => {

            if (err) {
                console.log(err);
                return res.send('Erro ao cadastrar usuário');
            }


            res.send('Usuário cadastrado com sucesso!');

        });

    });
};

exports.login = (req, res) => {
    res.render('auth/login');
};

exports.fazerLogin = async (req, res) => {

    const { email, senha } = req.body;

    const sql = `
        SELECT * FROM usuarios 
        WHERE email = ?
    `;


    db.query(sql, [email], async (err, resultado) => {

        if (err) {
            console.log(err);
            return res.send('Erro no login');
        }


        if (resultado.length === 0) {
            return res.send('Usuário não encontrado');
        }


        const usuario = resultado[0];


        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );


        if (!senhaCorreta) {
            return res.send('Senha incorreta');
        }


        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        };


        res.redirect('/dashboard');

    });

};