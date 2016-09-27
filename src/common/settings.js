import settings from 'electron-settings'

export default {
    set: (key, value) => settings.setSync(key, value),
    get: (key) => settings.getSync(key)
}
