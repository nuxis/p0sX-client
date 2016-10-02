import escpos from 'escpos'

const kitchen = (adapter, config, cart, id) => {
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
        for(var i = 0; i < cart.length; i++) {
            printer.font('b')
                .print('\x1b\x74\x13')
                .align('CT')
                .size(2, 2)
                .text('Ordre: ' + id)
                .size(1, 1)
                .feed(2)
                .align('LT')
            printer.text('    ' + cart[i].name)
            cart[i].ingredients.forEach(i => {
                printer.text('        ' + i.name, 'CP858')
            })
            printer.feed(1)
                .text('    ' + cart[i].message)
                .cut(true, 5)
        }
        printer.close()
    })
}

export default kitchen
