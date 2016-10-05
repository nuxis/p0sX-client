import escpos from 'escpos'
import moment from 'moment'

function getDevice(adapter, config) {
    switch (adapter) {
        case 'Network':
            return new escpos.Network(config.address, config.port)
        case 'USB':
            return new escpos.USB(config.vid, config.pid)
        case 'Serial':
            return new escpos.Serial(config.path, config.options)
        case 'Console':
            return new escpos.Console(config.handler)
        default:
            return undefined
    }
}

const print = (adapter, config, cart, id, total, openDrawer) => {
    const device = getDevice(adapter, config)
    const printer = new escpos.Printer(device)
    escpos.Image.load(require('../images/receipt.png'), (img) => {
        device.open(() => {
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
                .text('  Dato: ' + moment(new Date()).format("DD.MM.YYYY HH:mm:ss"))
                .text('')
            for(let entry of cart) {
                printer.text(itemToString(entry))
            }
            printer
                .feed(1)
                .text('  MVA                      : 0,- (fritatt)')
                .style('BU')
                .text('  Total                    : ' + total + ',-')
                .style('NORMAL')
            if (openDrawer) {
                printer.cashdraw()
            }
            printer.cut(true, 6)
                .close()
        })
    })
}

const cashDraw = (adapter, config) => {
    const device = getDevice(adapter, config)
    const printer = new escpos.Printer(device)
    device.open(() => {
        printer.cashdraw()
            .flush()
            .close()
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
