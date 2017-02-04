import moment from 'moment'
import { Printer } from 'escpos'
import { Font, Justification, RasterMode, CodeTable } from 'escpos/dist/Commands'
import { Network } from 'escpos/dist/adapters/Network'
import Image from 'escpos/dist/Image'

const padSize = 25

async function print (adapter, config, companyInfo, cart, total, openDrawer) {
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

    printer.font(Font.A)
        .setCodeTable(CodeTable.PC865)
        .setJustification(Justification.Center)

    if (companyInfo.image) {
        const image = await Image.load(companyInfo.image)
        printer.raster(image, RasterMode.Normal)
    }

    printer.writeLine(companyInfo.shopName)
        .feed()
        .setJustification(Justification.Left)
        .writeLine(companyInfo.companyName)
        .writeLine(companyInfo.companyAddress)
        .writeLine(companyInfo.orgNr)
        .writeLine('Dato: ' + moment(new Date()).format('DD.MM.YYYY HH:mm:ss'))
        .feed()
        .writeList(cart.map(itemToString))
        .feed()
        .writeLine(itemToString(taxItem))
        .setBold()
        .setUnderline()
        .writeLine(itemToString(totalItem))
        .setBold(false)
        .resetToDefault()
        .feed(6)
        .cut(true)

    if (openDrawer) {
        printer.cashDraw()
    }

    await printer.close()
}

function getDevice (adapter, config) {
    switch (adapter) {
    case 'Network':
        return new Network(config.address, config.port)
    default:
        return undefined
    }
}

async function cashDraw (adapter, config) {
    const device = getDevice(adapter, config)
    const printer = await new Printer(device).open()
    await printer.openDrawer().close()
}

const itemToString = (item) => {
    const pad = new Array(padSize - item.name.length).join(' ')
    const note = item.note ? ` (${item.note})` : ''
    return `${item.name}${pad}: ${item.price},-${note}`
}

export default print
export {
    cashDraw
}
