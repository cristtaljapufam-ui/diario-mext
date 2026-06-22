const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '92053761',
    database: 'projeto_mext'
});

// Rota para buscar os estudos
app.get('/api/estudos', (req, res) => {
    db.query('SELECT * FROM diario_estudos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Rota para salvar um novo estudo
app.post('/api/estudos', (req, res) => {
    const { data_estudo, conteudo, nivel } = req.body;
    const sql = 'INSERT INTO diario_estudos (data_estudo, conteudo, nivel) VALUES (?, ?, ?)';
    
    db.query(sql, [data_estudo, conteudo, nivel], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao salvar no banco');
        }
        res.status(201).json({ message: 'Estudo registrado com sucesso!' });
    });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));