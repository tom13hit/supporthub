const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function enviarNovoTicket(ticket, usuario) {

    try {

        await resend.emails.send({

            from: 'SupportHub <onboarding@resend.dev>',

            to: process.env.ADMIN_EMAIL,

            subject: `🎫 Novo Ticket - ${ticket.titulo}`,

            html: `
                <h2>Novo chamado recebido!</h2>

                <p><strong>Cliente:</strong> ${usuario.nome}</p>

                <p><strong>Email:</strong> ${usuario.email}</p>

                <p><strong>Título:</strong> ${ticket.titulo}</p>

                <p><strong>Prioridade:</strong> ${ticket.prioridade}</p>

                <p><strong>Descrição:</strong></p>

                <p>${ticket.descricao}</p>
            `
        });

        console.log('📧 Email enviado!');

    } catch (erro) {

        console.log('Erro ao enviar email');

        console.log(erro);

    }

}

module.exports = {
    enviarNovoTicket
};