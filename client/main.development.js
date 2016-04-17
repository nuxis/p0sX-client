import { app, BrowserWindow } from 'electron'
import ElectronSettings from 'electron-settings';

let mainWindow = null

let settings = null

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {
    // Initialize the window to our specified dimensions
    mainWindow = new BrowserWindow({ width: 1200, height: 900, icon: __dirname + '/static/pi_logo.png', frame: true});

    settings = new ElectronSettings()
    settings.set('server_address', 'http://127.0.0.1:8000')

    // Tell Electron where to load the entry point from
    mainWindow.loadURL('file://' + __dirname + '/app/app.html');

    // Clear out the main window when the app is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
