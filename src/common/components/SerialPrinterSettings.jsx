import React from 'react'
import TextField from 'material-ui/TextField'

class SerialPrinterSettings extends React.Component {
    static propTypes = {
        settings: React.PropTypes.object.isRequired,
        updateSettings: React.PropTypes.func.isRequired,
        strings: React.PropTypes.object.isRequired
    }

    handleSettingChange = (event) => {
        this.props.updateSettings({
            [event.target.id]: event.target.value
        })
    }

    render () {
        const { settings, strings } = this.props

        return (
            <div style={{marginLeft: '20px'}}>
                <TextField
                    floatingLabelText={strings.serial_port}
                    defaultValue={settings.port}
                    id='port'
                    onChange={this.handleSettingChange}
                    fullWidth
                />
                <TextField
                    floatingLabelText={strings.baud_rate}
                    defaultValue={settings.baud_rate}
                    id='baud_rate'
                    onChange={this.handleSettingChange}
                    type='number'
                    fullWidth
                />
            </div>
        )
    }
}

export default SerialPrinterSettings
