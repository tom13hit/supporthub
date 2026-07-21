const db = require('../config/database');
const emailService = require('../services/emailService');

exports.criarTicket = async (req, res) => {

    const { titulo, descricao, prioridade } = req.body;

    const usuario_id = req.session.usuario.id;

    const sql = `
        INSERT INTO tickets (
            usuario_id,
            titulo,
            descricao,
            prioridade
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [usuario_id, titulo, descricao, prioridade],
        async (err, resultado) => {

            if (err) {
                console.log(err);
                return res.send('Erro ao criar chamado.');
            }

            await emailService.enviarNovoTicket(
                {
                    titulo,
                    descricao,
                    prioridade
                },
                req.session.usuario
            );

            res.send('Chamado criado com sucesso!');

        }
    );

};