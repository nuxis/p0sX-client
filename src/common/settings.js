import settings from 'electron-settings'

settings.configure({prettify: true})

export default {
    set: (key, value) => settings.setSync(key, value),
    setObject: (values) => {
        Object.keys(values).forEach(function (key) {
            const value = values[key]
            settings.setSync(key, value)
        })
    },
    get: (key) => settings.getSync(key)
}
