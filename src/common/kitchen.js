import escpos from 'escpos'

const kitchen = (adapter, config, entry, id) => {
    var device
    switch (adapter) {
    case 'Network':
        device = new escpos.Network(config.address, config.port)
        break
    case 'USB':
        device = new escpos.USB(config.vid, config.pid)
        break
    case 'Serial':
        device = new escpos.Serial(config.path, config.options)
        break
    case 'Console':
        device = new escpos.Console(config.handler)
        break
    }

    const printer = new escpos.Printer(device)
    device.open(() => {
        console.log('print start?')
        printer.font('b')
            .align('CT')
            .size(2, 2)
            .text('Ordre: ' + id)
            .size(1, 1)
            .feed(2)
            .align('LT')
        printer.text('    ' + entry.name)
        entry.ingredients.forEach(i => {
            printer.text('        ' + i.name)
        })
        printer.feed(1)
            .text('    ' + entry.message)
            .cut(true, 5)
            .close()

        console.log('print done?')
    })
}

export default kitchen
