import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'

class NetworkPrinterSettings extends React.Component {
    static propTypes = {
        settings: PropTypes.object.isRequired,
        updateSettings: PropTypes.func.isRequired,
        strings: PropTypes.object.isRequired
    }

    handleAddressChange = (event) => this.props.updateSettings({address: event.target.value})
    handlePortChange = (event) => this.props.updateSettings({port: parseInt(event.target.value)})
    render () {
        const { settings, strings } = this.props

        return (
            <div style={{marginLeft: '20px'}}>
                <TextField
                    floatingLabelText={strings.address}
                    defaultValue={settings.address}
                    onChange={this.handleAddressChange}
                    fullWidth
                /><br />
                <TextField
                    floatingLabelText={strings.port}
                    defaultValue={settings.port}
                    onChange={this.handlePortChange}
                    type='number'
                    fullWidth
                />
            </div>
        )
    }
}

export default NetworkPrinterSettings
