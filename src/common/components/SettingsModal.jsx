import React from 'react'
import { connect } from 'react-redux'
import { getSettings, getStrings } from '../../Kiosk/selectors'
import { getAllKioskData, openAndGetCurrentShift, updateSettings, setLockModalOpen } from '../../Kiosk/actions'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import PrinterSettings from './PrinterSettings'
import {Tabs, Tab} from 'material-ui/Tabs'

class SettingsModal extends React.Component {
    static propTypes = {
        toggleOpen: React.PropTypes.any.isRequired,
        onSave: React.PropTypes.func,
        settings: React.PropTypes.object,
        updateSettings: React.PropTypes.func,
        initial: React.PropTypes.bool,
        strings: React.PropTypes.object
    }

    componentWillMount = () => {
        const {api_auth_token, server_address, language, name, receiptPrinter, kitchenPrinter, receipt} = this.props.settings
        this.setState({
            api_auth_token,
            server_address,
            language: language || 'en',
            name,
            receiptPrinter: receiptPrinter || {},
            kitchenPrinter: kitchenPrinter || {},
            receipt: receipt || {}
        })
    }

    onSave = () => {
        const { onSave, toggleOpen, initial } = this.props
        onSave(this.state, initial)
        toggleOpen()
    }

    onClose = () => this.props.toggleOpen()
    handleLanguageChange = (event, index, value) => this.setState({language: value})
    handleReceiptSettingChange = (event) => {
        this.setState({
            receipt: {
                ...this.state.receipt,
                [event.target.id.substring(8)]: event.target.value
            }
        })
    }
    handleSettingChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleReceiptPrinterConfigChange = (type, config) => {
        this.setState({
            receiptPrinter: {
                type,
                config: {
                    ...this.state.receiptPrinter.config,
                    ...config
                }
            }
        })
    }

    handleKitchenPrinterConfigChange = (type, config) => {
        this.setState({
            kitchenPrinter: {
                type,
                config: {
                    ...this.state.kitchenPrinter.config,
                    ...config
                }
            }
        })
    }

    render () {
        const { settings, strings, initial } = this.props
        const { api_auth_token, server_address, language, name, receiptPrinter, kitchenPrinter, receipt } = this.state
        const actions = [
            <FlatButton
                label={strings.close}
                primary
                disabled={initial}
                onTouchTap={this.onClose}
            />,
            <FlatButton
                label={strings.save}
                primary
                onTouchTap={this.onSave}
            />
        ]

        return (
            <Dialog actions={actions} modal={initial} onRequestClose={this.onClose} open={settings.open} title={strings.settings} autoScrollBodyContent>
                <Tabs>
                    <Tab label={strings.general}>
                        <TextField
                            id='name'
                            floatingLabelText={strings.name}
                            defaultValue={name}
                            onChange={this.handleSettingChange}
                            fullWidth
                        /><br />
                        <SelectField
                            floatingLabelText={strings.language}
                            value={language}
                            onChange={this.handleLanguageChange}
                        >
                            <MenuItem value='en' primaryText='English' />
                            <MenuItem value='no' primaryText='Norsk' />
                        </SelectField><br />
                        <TextField
                            id='server_address'
                            floatingLabelText={strings.server}
                            // eslint-disable-next-line camelcase
                            defaultValue={server_address}
                            onChange={this.handleSettingChange}
                            fullWidth
                        /><br />
                        <TextField
                            id='api_auth_token'
                            floatingLabelText={strings.token}
                            // eslint-disable-next-line camelcase
                            defaultValue={api_auth_token}
                            onChange={this.handleSettingChange}
                            fullWidth
                        />
                    </Tab>
                    <Tab label={strings.printing}>
                        <div className='row'>
                            <div className='col-xs-6'>
                                <PrinterSettings label={strings.receipt_printer} printer={receiptPrinter} updateSettings={this.handleReceiptPrinterConfigChange} strings={strings} />
                            </div>
                            <div className='col-xs-6'>
                                <PrinterSettings label={strings.kitchen_printer} printer={kitchenPrinter} updateSettings={this.handleKitchenPrinterConfigChange} strings={strings} />
                            </div>
                        </div>
                    </Tab>
                    <Tab label={strings.receipt}>
                        <TextField
                            id='receipt-image'
                            floatingLabelText={strings.image}
                            defaultValue={receipt.image}
                            onChange={this.handleReceiptSettingChange}
                            fullWidth
                        /><br />
                        <TextField
                            id='receipt-header'
                            floatingLabelText={strings.header}
                            defaultValue={receipt.header}
                            onChange={this.handleReceiptSettingChange}
                            fullWidth
                        /><br />
                        <TextField
                            id='receipt-name'
                            floatingLabelText={strings.organization_name}
                            defaultValue={receipt.name}
                            onChange={this.handleReceiptSettingChange}
                            fullWidth
                        /><br />
                        <TextField
                            id='receipt-address'
                            floatingLabelText={strings.organization_address}
                            defaultValue={receipt.address}
                            onChange={this.handleReceiptSettingChange}
                            fullWidth
                        /><br />
                        <TextField
                            id='receipt-orgnr'
                            floatingLabelText={strings.organization_number}
                            defaultValue={receipt.orgnr}
                            onChange={this.handleReceiptSettingChange}
                            fullWidth
                        />
                    </Tab>
                </Tabs>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initial: getSettings(state).server_address.length === 0,
        settings: getSettings(state),
        strings: getStrings(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (settings, initial) => {
            dispatch(updateSettings(settings))
            if (initial) {
                dispatch(getAllKioskData())
                dispatch(setLockModalOpen(true))
            }
        },
        openShiftModal: () => {
            dispatch(openAndGetCurrentShift())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsModal)
