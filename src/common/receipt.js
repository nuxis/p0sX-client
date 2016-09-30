import escpos from 'escpos'

const print = (adapter, config, items) => {
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
        printer.font('a')
            .align('ct')
            .text('Polar Part 25: Get Cyberpunk\'d')
            .style('B')
            .align('lt')
        items.forEach(item => printer.text(itemToString(item)))
        printer.feed(2)
            .text('Have a nice day!')
        printer.feed(2).cut().cashdraw().close()
    })
}

const itemToString = (item) => {
    return item.get('name') + ' ' + item.get('price') + ',-'
}

export default print
