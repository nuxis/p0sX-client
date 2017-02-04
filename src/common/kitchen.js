// import escpos from 'escpos'
// import moment from 'moment'

// function getDevice (adapter, config) {
    // switch (adapter) {
    // case 'Network':
    //     return new escpos.Network(config.address, config.port)
    // case 'USB':
    //     return new escpos.USB(config.vid, config.pid)
    // case 'Serial':
    //     return new escpos.Serial(config.path, config.options)
    // case 'Console':
    //     return new escpos.Console(config.handler)
    // default:
    //     return undefined
    // }
// }

const kitchenReceipt = (adapter, config, entry, id) => {
    // const device = getDevice(adapter, config)
    // const printer = new escpos.Printer(device)
    // device.open(() => {
    //     printer.font('b')
    //         .align('CT')
    //         .size(2, 2)
    //         .text('Ordre: ' + id)
    //         .size(1, 1)
    //         .feed(1)
    //         .align('LT')
    //         .text('  Dato: ' + moment(new Date()).format('DD.MM.YYYY HH:mm:ss'))
    //         .feed(1)
    //     printer.text('  ' + entry.name)
    //     entry.ingredients.forEach(i => {
    //         printer.text('    ' + i.name)
    //     })
    //     printer.feed(1)
    //         .text('  ' + entry.message)
    //         .cut(true, 5)
    //         .close()
    // })
}

const customerReceipt = (adapter, config, entries, id, openDrawer) => {
    // const device = getDevice(adapter, config)
    // const printer = new escpos.Printer(device)
    // device.open(() => {
    //     printer.font('b')
    //         .align('CT')
    //         .size(2, 2)
    //         .text('Ordre: ' + id)
    //         .size(1, 1)
    //         .feed(1)
    //         .align('LT')
    //         .text('  Dato: ' + moment(new Date()).format('DD.MM.YYYY HH:mm:ss'))
    //         .feed(1)
    //     entries.forEach(entry => {
    //         printer.text('  ' + entry.name)
    //         entry.ingredients.forEach(i => {
    //             printer.text('    ' + i.name)
    //         })
    //         if (entry.message.length > 0) {
    //             printer.text('  ' + entry.message)
    //         }
    //         printer.feed(1)
    //     })
    //     if (openDrawer) {
    //         printer.cashdraw()
    //     }
    //     printer.cut(true, 5)
    //         .close()
    // })
}

export {
    kitchenReceipt,
    customerReceipt
}
