import escpos from 'escpos'

const printShift = (adapter, config, shift, name) => {
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
        printer.font('b')
            .size(1, 1)
            .align('LT')
            .text('  Kasse: ' + name)
            .text('  Started: ' + new Date(shift.get('start')).toString().slice(0, -34))
            .text('  Now: ' + new Date().toString().slice(0, -34))
            .text('  Cash: ' + shift.get('cash') + ',-')
            .text('  Crew: ' + shift.get('crew') + ',-')
            .cashdraw()
            .cut(true, 6)
            .close()
    })
}

export default printShift
