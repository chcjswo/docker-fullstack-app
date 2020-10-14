const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();

app.use(bodyParser.json());

db.pool.query(
	`create table lists (
        id INTEGER auto increment,
        value text,
        primary key (id)
    )`,
	(err, results, fileds) => {
		console.log('results => ', results);
	}
);

app.get('/api/values', (res, req) => {
	const sql = 'SELECT * FROM lists';
	db.pool.query(sql, (err, results, fileds) => {
		if (err) {
			return res.status(500).send(err);
		}
		return res.json(results);
	});
});

app.post('/api/values', (req, res) => {
	const sql = `INSERT INTO lists (value) VALUES ('${(req, body.value)}');`;
	db.pool.query(sql, (err, results, fields) => {
		if (err) {
			return res.status(500).send(err);
		}
		return res.json({
			success: true,
			value: req.body.value,
		});
	});
});

app.listen(5000, () => {
	console.log('Server is running on 5000 port');
});
