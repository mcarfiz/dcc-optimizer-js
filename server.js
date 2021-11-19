const { app, BrowserWindow } = require("electron");
const path = require('path');

// electron stuff
function createWindow () {
    const win = new BrowserWindow({
        width: 500,
        height: 700,
        titleBarStyle: "hidden",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
  })

    win.menuBarVisible = false
    win.loadFile(path.join(__dirname, '/public/index.html'))
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// app closure
app.on('window-all-closed', () => {
    // on macos app should be closed only manually
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
