import settings from 'electron-settings'

export default {
    set: (key, value) => settings.set(key, value, {prettify: true}),
    setObject: (values) => {
        Object.keys(values).forEach(function (key) {
            const value = values[key]
            settings.set(key, value, {prettify: true})
        })
    },
    get: (key) => settings.get(key),
    getAll: () => settings.getAll()
}
