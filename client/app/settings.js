'use strict'
import ElectronSettings from 'electron-settings'
import { remote } from 'electron'

console.log(`${__dirname}/settings.json`)
console.log(remote.app.getAppPath())

module.exports = new ElectronSettings({
    configDirPath: remote.app.getAppPath(),
    configFileName: 'settings'
})
