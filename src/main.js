import { app, BrowserWindow } from 'electron'
import 'electron-squirrel-startup'
import { ChildProcess } from 'child_process'
import path from 'path'

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    app.quit()
}

function handleSquirrelEvent () {
    if (process.argv.length === 1) {
        return false
    }

    const appFolder = path.resolve(process.execPath, '..')
    const rootAtomFolder = path.resolve(appFolder, '..')
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'))
    const exeName = path.basename(process.execPath)

    const spawn = function (command, args) {
        try {
            return ChildProcess.spawn(command, args, {detached: true})
        } catch (error) {}

        return undefined
    }

    const spawnUpdate = function (args) {
        return spawn(updateDotExe, args)
    }

    const squirrelEvent = process.argv[1]
    switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
        // Optionally do things such as:
        // - Add your .exe to the PATH
        // - Write to the registry for things like file associations and
        //   explorer context menus

        // Install desktop and start menu shortcuts
        spawnUpdate(['--createShortcut', exeName])

        setTimeout(app.quit, 1000)
        return true

    case '--squirrel-uninstall':
        // Undo anything you did in the --squirrel-install and
        // --squirrel-updated handlers

        // Remove desktop and start menu shortcuts
        spawnUpdate(['--removeShortcut', exeName])

        setTimeout(app.quit, 1000)
        return true

    case '--squirrel-obsolete':
        // This is called on the outgoing version of your app before
        // we update to the new version - it's the opposite of
        // --squirrel-updated

        app.quit()
        return true
    }
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('ready', () => {
    // Initialize the window to our specified dimensions
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        minWidth: 800,
        frame: true
    })
    // mainWindow.openDevTools()

    // Tell Electron where to load the entry point from
    mainWindow.loadURL(`file://${__dirname}/app.html`)

    // Clear out the main window when the app is closed
    mainWindow.on('closed', () => {
    })
})
