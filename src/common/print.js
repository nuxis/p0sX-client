import moment from 'moment'
import Printer from 'escpos-print/Printer'
import { Font, Justification, RasterMode, CodeTable, Underline, TextMode } from 'escpos-print/Commands'
import { Network, Console, Serial } from 'escpos-print/Adapters'
import Image from 'escpos-print/Image'

const PAD_SIZE = 25
// TODO: Make print functions sagas so they can be dispatched?
//       And have access to store for strings.
export const printReceipt = async (adapter, config, companyInfo, cart, total) => {
    const device = getDevice(adapter, config)
    const printer = await new Printer(device, 'CP865').open()
    const taxItem = {
        name: 'MVA',
        price: '0',
        note: 'fritatt'
    }
    const totalItem = {
        name: 'Total',
        price: total
    }

    if (companyInfo.image && companyInfo.image.length > 0) {
        const image = await Image.load(companyInfo.image)
        printer.setJustification(Justification.Center)
            .raster(image, RasterMode.Normal)
    }

    await printer.setJustification(Justification.Center)
        .setFont(Font.A)
        .setCodeTable(CodeTable.PC865)
        .writeLine(companyInfo.header)
        .feed()
        .setJustification(Justification.Left)
        .writeLine(companyInfo.name)
        .writeLine(`Adresse: ${companyInfo.address}`)
        .writeLine(`OrgNr:   ${companyInfo.orgnr}`)
        .writeLine(`Dato:    ${moment().format('DD.MM.YYYY HH:mm:ss')}`)
        .feed()
        .writeList(cart.map(itemToString))
        .feed()
        .writeLine(itemToString(taxItem))
        .setBold()
        .setUnderline(Underline.Double)
        .writeLine(itemToString(totalItem))
        .resetToDefault()
        .feed(5)
        .cut(true)
        .close()
}

export const kitchenReceipt = async (adapter, config, entry, id) => {
    const device = getDevice(adapter, config)
    const printer = await new Printer(device, 'CP865').open()
    printer.setFont(Font.B)
        .setCodeTable(CodeTable.PC865)
        .setJustification(Justification.Center)
        .setTextMode(TextMode.DualWidthAndHeight)
        .writeLine('Ordre: ' + id)
        .setTextMode(TextMode.Normal)
        .feed(1)
        .setJustification(Justification.Left)
        .writeLine('Dato: ' + moment(new Date()).format('DD.MM.YYYY HH:mm:ss'))
        .feed(1)
        .writeLine(entry.name)
        .writeList(entry.ingredients.map(i => '  ' + i.name))
        .feed(1)
    if (entry.message.length > 0) {
        printer.writeLine(entry.message)
            .feed(1)
    }
    printer.feed(4)
        .cut(true)
        .close()
}

export const customerOrderReceipt = async (adapter, config, entries, id, openDrawer) => {
    const device = getDevice(adapter, config)
    const printer = await new Printer(device, 'CP865').open()
    printer.setFont(Font.B)
        .setCodeTable(CodeTable.PC865)
        .setJustification(Justification.Center)
        .setTextMode(TextMode.DualWidthAndHeight)
        .writeLine('Ordre: ' + id)
        .setTextMode(TextMode.Normal)
        .feed(1)
        .setJustification(Justification.Left)
        .writeLine('Dato: ' + moment(new Date()).format('DD.MM.YYYY HH:mm:ss'))
        .feed(1)
    entries.forEach(entry => {
        printer.writeLine(entry.name)
            .writeList(entry.ingredients.map(i => '  ' + i.name))
            .feed(1)
        if (entry.message.length > 0) {
            printer.writeLine(entry.message)
                .feed(1)
        }
    })
    if (openDrawer) {
        printer.openDrawer()
    }
    await printer.feed(4)
        .cut(true)
        .close()
}

export const cashDraw = async (adapter, config) => {
    const device = getDevice(adapter, config)
    const printer = await new Printer(device).open()
    await printer.openDrawer().close()
}

export const printShift = async (adapter, config, shift, name) => {
    const device = getDevice(adapter, config)
    const printer = await new Printer(device).open()
    await printer.setFont(Font.B)
        .setTextMode(TextMode.Normal)
        .setJustification(Justification.Left)
        .writeLine('Kasse:   ' + name)
        .writeLine('Started: ' + moment(new Date(shift.start)).format('DD.MM.YYYY HH:mm:ss'))
        .writeLine('Now:     ' + moment().format('DD.MM.YYYY HH:mm:ss'))
        .writeLine('Cash:    ' + shift.cash + ',-')
        .writeLine('Credit:    ' + shift.credit + ',-')
        .openDrawer()
        .feed(5)
        .cut(true)
        .close()
}

const getDevice = (adapter, config) => {
    switch (adapter) {
    case 'Network':
        return new Network(config.address, config.port)
    case 'Console':
        return new Console(console.log, 32)
    case 'Serial':
        return new Serial(config.port, { baudRate: config.baud_rate })
    default:
        return undefined
    }
}

const itemToString = (item) => {
    const padSize = PAD_SIZE - item.name.length
    const pad = padSize > 0 ? new Array(padSize).join(' ') : ''
    const note = item.note ? ` (${item.note})` : ''
    return `${item.name}${pad}: ${item.price},-${note}`
}
