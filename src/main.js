import { app, BrowserWindow } from 'electron'

let mainWindow = null

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('ready', () => {
    // Initialize the window to our specified dimensions
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        frame: true
    })
    mainWindow.openDevTools()

    // Tell Electron where to load the entry point from
    mainWindow.loadURL(`file://${__dirname}/app.html`)

    // Clear out the main window when the app is closed
    mainWindow.on('closed', () => {
        mainWindow = null
    })
})
