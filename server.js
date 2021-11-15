import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// set /public directory to fetch files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
console.log('Listening on port ' + port);

// render index
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})
