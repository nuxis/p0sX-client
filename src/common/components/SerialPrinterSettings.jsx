import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import SerialPort from 'serialport'

class SerialPrinterSettings extends React.Component {
    static propTypes = {
        settings: PropTypes.object.isRequired,
        updateSettings: PropTypes.func.isRequired,
        strings: PropTypes.object.isRequired
    }

    componentWillMount () {
        this.setState({
            serialPorts: []
        })
    }

    componentDidMount () {
        SerialPort.list((err, ports) => {
            if (err) return
            this.setState({
                serialPorts: ports.map(p => p.comName)
            })
        })
    }

    handleBaudRateChange = (event, value) => {
        this.props.updateSettings({
            'baud_rate': value
        })
    }

    handleSerialPortChange = (event, index) => {
        this.props.updateSettings({
            port: this.state.serialPorts[index]
        })
    }

    render () {
        const { settings, strings } = this.props

        return (
            <div style={{marginLeft: '20px'}}>
                <SelectField
                    floatingLabelText={strings.serial_port}
                    value={settings.port}
                    onChange={this.handleSerialPortChange}
                    fullWidth
                >
                    {this.state.serialPorts.map((port, i) => <MenuItem key={i} value={port} primaryText={port} />)}
                </SelectField>
                <TextField
                    floatingLabelText={strings.baud_rate}
                    defaultValue={settings.baud_rate}
                    onChange={this.handleBaudRateChange}
                    type='number'
                    fullWidth
                />
            </div>
        )
    }
}

export default SerialPrinterSettings
