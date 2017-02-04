import React from 'react'
import { connect } from 'react-redux'
import { getSettings, getStrings } from '../../Kiosk/selectors'
import { getAllKioskData, openAndGetCurrentShift, emptyCart, updateSettings, setLockModalOpen } from '../../Kiosk/actions'
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
        const {api_auth_token, server_address, language, name, receiptPrinter, kitchenPrinter} = this.props.settings
        this.setState({
            api_auth_token,
            server_address,
            language,
            name,
            receiptPrinter: receiptPrinter || {},
            kitchenPrinter: kitchenPrinter || {}
        })
    }

    onSave = () => {
        const { onSave, toggleOpen, initial } = this.props
        onSave(this.state, initial)
        toggleOpen()
    }

    onClose = () => this.props.toggleOpen()
    handleLanguageChange = (event, index, value) => this.setState({language: value})
    handleServerChange = (event, value) => this.setState({server_address: value})
    handleTokenChange = (event, value) => this.setState({api_auth_token: value})
    handleNameChange = (event, value) => this.setState({name: value})

    handleReceiptPrinterConfigChange = (type, config) => {
        this.setState({
            receiptPrinter: {
                type,
                config
            }
        })
    }

    handleKitchenPrinterConfigChange = (type, config) => {
        this.setState({
            kitchenPrinter: {
                type,
                config
            }
        })
    }

    render () {
        const { settings, strings, initial } = this.props
        const { api_auth_token, server_address, language, name, receiptPrinter, kitchenPrinter } = this.state
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
                            onChange={this.handleNameChange}
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
                            id='server'
                            floatingLabelText={strings.server}
                            // eslint-disable-next-line camelcase
                            defaultValue={server_address}
                            onChange={this.handleServerChange}
                            fullWidth
                        /><br />
                        <TextField
                            id='token'
                            floatingLabelText={strings.token}
                            // eslint-disable-next-line camelcase
                            defaultValue={api_auth_token}
                            onChange={this.handleTokenChange}
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
                </Tabs>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initial: Object.getOwnPropertyNames(getSettings(state)).length === 1,
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
        },
        fetchData: () => {
            dispatch(getAllKioskData())
            dispatch(emptyCart())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsModal)
