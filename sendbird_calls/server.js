const crypto = require('crypto');
const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');

const host = 'localhost';
const port = 8000;
const SALT = crypto.randomBytes(6).toString('hex');
const jsonData = { 'server_secret': `${SALT}`}

const app = express();
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/json', (req, res) => {
    res.json(jsonData);
});

app.get('/msg', (req, res) => {
    res.send('msg');
});

app.get('/sha256', (req, res) => {
    const details = {
        hashvalue: (req.query.value ? genHashWithSalt(SALT + req.query.value) : ''),
    }
    res.render('sha256', details);
});

app.get('*', (req, res, next) => {
    res.status(404).send('Sorry, page not found');
    next();
});

app.listen(port, host, () => {
    console.log(`[Express] Server is running on http://${host}:${port}`);
    console.log(`Server secret key: ${SALT}`);
});

function genHashWithSalt(value) {
    return crypto.createHash('sha256').update(SALT + value).digest('hex');
}