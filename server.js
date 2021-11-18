//import express from "express";
/*import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import pkg from 'electron';
const { app, BrowserWindow } = pkg;*/

const { app, BrowserWindow } = require("electron");
const path = require('path');

//const { fileURLToPath } = require('url');
//const { dirname } = require('path');

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

/*const app = express();
const port = 3000;

// set /public directory to fetch files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
console.log('Listening on port ' + port);

// render index
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})*/


// electron stuff
function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: "hidden",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
  })

    win.menuBarVisible = false
    win.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
