import ElectronSettings from 'electron-settings'
import { remote } from 'electron'

export default new ElectronSettings({
    configDirPath: remote.app.getPath('userData')
})