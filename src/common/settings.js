import settings from 'electron-settings'

if (!settings.has('language')) {
    settings.setAll({
        api_auth_token: '',
        server_address: '',
        language: 'en',
        name: '',
        receiptPrinter: {
            type: 'Console',
            config: {}
        },
        kitchenPrinters: [
            {
                type: 'Console',
                config: {}
            }
        ],
        receipt: {
            header: '',
            name: '',
            address: '',
            orgnr: '',
            image: ''
        }
    }, {prettify: true})
}

export default {
    set: (key, value) => settings.set(key, value, {prettify: true}),
    setObject: (values) => {
        Object.keys(values).forEach(function (key) {
            const value = values[key]
            settings.set(key, value, {prettify: true})
        })
    },
    get: (key) => settings.get(key),
    getAll: () => settings.getAll(),
    isEmpty: () => !settings.has('language')
}
