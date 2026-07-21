const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'W&$2o2@',
    database: 'supporthub'
});

connection.connect((err) => {
    if (err) {
        console.log('Erro ao conectar no banco:', err);
        return;
    }

    console.log('Banco conectado com sucesso!');
});

module.exports = connection;