import * as http from 'http';
import * as fs from 'fs';
import { createHash, randomBytes } from 'crypto';

const __dirname = process.cwd();
const host = 'localhost';
const port = 8000;
const SALT = randomBytes(6).toString('hex');

function parseGetParams(query) {
    if (!query)
        return;
    var result = {};
    query.split('&').forEach(function(part) {
        var item = part.split('=');
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}  

function display (res, filename) {
    fs.readFile(__dirname + filename, (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end(`Could not read index.html file: ${err}`);
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end(data);
        }
    });
}

function genHashWithSalt(value) {
    return createHash('sha256').update(SALT + value).digest('hex');
}

function requestListener (req, res) {
    console.log(req.url);
    var url = req.url.split('?');
    switch (url[0]) {
        case '/json':
            res.setHeader('Content-Type', 'application/json');
            res.end(`{"server-secret": "${SALT}"}`);
            break;
        case '/msg':
            res.end('msg');
            break;
        case '/sha256':
            var getParams = parseGetParams(url[1]);
            if (getParams)
                res.end(genHashWithSalt(getParams['value']));
            else
                display(res, '/sha256.html'); 
            break;
        default:
            display(res, '/index.html'); 
            break;
    };
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    console.log(`Server secret key: ${SALT}`);
});