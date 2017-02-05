import settings from 'electron-settings'

settings.configure({prettify: true})
settings.defaults({
    'api_auth_token': '',
    'server_address': '',
    'language': 'en',
    'name': '',
    'receiptPrinter': {
        'type': 'Console',
        'config': {}
    },
    'kitchenPrinter': {
        'type': 'Console',
        'config': {}
    },
    'receipt': {
        'header': '',
        'name': '',
        'address': '',
        'orgnr': ''
    }
})

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
