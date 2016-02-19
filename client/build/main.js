var app = require('app'); 

// browser-window creates a native window
var BrowserWindow = require('browser-window');
var mainWindow = null;

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {
    // Initialize the window to our specified dimensions
    mainWindow = new BrowserWindow({ width: 1200, height: 900, icon: __dirname + '/pi_logo.png', frame: true});
	
    // Tell Electron where to load the entry point from
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Clear out the main window when the app is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});