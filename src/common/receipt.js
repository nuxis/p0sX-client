import escpos from 'escpos'
import moment from 'moment'

const print = (adapter, config, cart, id, total, openDrawer) => {
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
    escpos.Image.load(require('../images/receipt.png'), (img) => {
        device.open((err) => {
            printer.font('b')
                .size(1, 1)
                .align('CT')
                .image(img, 'd24')
                .text('Polar Party 25: Get Cyberpunk\'d')
                .feed(1)
                .align('LT')
                .text('  Polar Interesseorganisasjon')
                .text('  Adresse: Kolstadgata 1 0652 Oslo')
                .text('  Org nr: 986 255 486')
                .text('  Dato: ' + moment(new Date()).format("DD.MM.YYYY HH:mm:SS"))
                .text('')
            for(var i = 0; i < cart.length; i++) {
                printer.text(itemToString(cart[i]))
            }
            printer
                .feed(1)
                .text('  MVA                      : 0,- (fritatt)')
                .style('BU')
                .text('  Total                    : ' + total + ',-')
                .style('NORMAL')
                .feed(1)
                .size(2, 2)
                .text('  Ordre: ' + id)
                .size(1, 1)
            if (openDrawer) {
                printer.cashdraw()
            }
            printer.cut(true, 6)
                .close()
        })
    })
}

const cashDraw = (adapter, config) => {
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
        printer.cashdraw().close()
    })
}

const itemToString = (item) => {
    var outString = '  ' + item.name
    while (outString.length < 27) {
        outString = outString + ' '
    }

    return outString + ': ' + item.price + ',-'
}

export default print
export {
    cashDraw
}
