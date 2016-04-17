'use strict'
import ElectronSettings from 'electron-settings'
import { remote } from 'electron'

module.exports = new ElectronSettings({
    configDirPath: remote.app.getAppPath(),
    configFileName: 'settings'
})
