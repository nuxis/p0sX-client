import React from 'react'
import NetworkPrinterSettings from './NetworkPrinterSettings'
import SerialPrinterSettings from './SerialPrinterSettings'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class PrinterSettings extends React.Component {
    static propTypes = {
        printer: React.PropTypes.object.isRequired,
        updateSettings: React.PropTypes.func.isRequired,
        strings: React.PropTypes.object.isRequired,
        label: React.PropTypes.string.isRequired
    }

    networkConfig = {
        address: '',
        port: ''
    }

    serialConfig = {
        baud_rate: 9600
    }

    handlePrinterTypeChange = (event, index, value) => {
        var config = {}
        if (value === 'Network') config = {...this.networkConfig}
        if (value === 'Serial') config = {...this.serialConfig}

        this.props.updateSettings(value, config)
    }

    handlePrinterConfigChange = (settings) => this.props.updateSettings(this.props.printer.type, settings)

    getSettingsForPrinter = (type) => {
        switch (type) {
        case 'Network':
            return <NetworkPrinterSettings strings={this.props.strings} settings={this.props.printer.config} updateSettings={this.handlePrinterConfigChange} />
        case 'Serial':
            return <SerialPrinterSettings strings={this.props.strings} settings={this.props.printer.config} updateSettings={this.handlePrinterConfigChange} />
        case 'Console':
            return <div />
        }
    }

    render () {
        const { printer, strings, label } = this.props

        return (
            <div>
                <h3 style={{marginBottom: '0'}}>{label}</h3>
                <SelectField
                    floatingLabelText={strings.printer_type}
                    value={printer.type}
                    onChange={this.handlePrinterTypeChange}
                >
                    <MenuItem value='Network' primaryText={strings.network} />
                    <MenuItem value='Serial' primaryText={strings.serial} />
                    <MenuItem value='Console' primaryText={strings.console} />
                </SelectField>
                {this.getSettingsForPrinter(printer.type)}
            </div>
        )
    }
}

export default PrinterSettings
