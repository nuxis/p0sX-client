import React from 'react'
import TextField from 'material-ui/TextField'

class SerialPrinterSettings extends React.Component {
    static propTypes = {
        settings: React.PropTypes.object.isRequired,
        updateSettings: React.PropTypes.func.isRequired,
        strings: React.PropTypes.object.isRequired
    }

    handleBaudRateChange = (event) => this.props.updateSettings({baud_rate: parseInt(event.target.value)})
    render () {
        const { settings, strings } = this.props

        return (
            <div style={{marginLeft: '20px'}}>
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
