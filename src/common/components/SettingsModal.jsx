import React from 'react'
import { connect } from 'react-redux'
import { getSettings, getStrings } from '../../Kiosk/selectors'
import { getAllKioskData, openAndGetCurrentShift, updateSettings, setLockModalOpen } from '../../Kiosk/actions'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import PrinterSettings from './PrinterSettings'
import {Tabs, Tab} from 'material-ui/Tabs'
import { remote } from 'electron'
import { red500 } from 'material-ui/styles/colors'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

class SettingsModal extends React.Component {
    static propTypes = {
        toggleOpen: React.PropTypes.any.isRequired,
        onSave: React.PropTypes.func,
        settings: React.PropTypes.object,
        initial: React.PropTypes.bool,
        strings: React.PropTypes.object,
        refreshData: React.PropTypes.func
    }

    componentWillMount () {
        const {api_auth_token, server_address, language, name, receiptPrinter, kitchenPrinter, receipt} = this.props.settings
        this.setState({
            api_auth_token,
            server_address,
            language: language,
            name,
            receiptPrinter: receiptPrinter,
            kitchenPrinter: kitchenPrinter,
            receipt: receipt
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
    handleReceiptImageChange = (filenames) => {
        if (filenames && filenames.length === 1) {
            this.setState({
                receipt: {
                    ...this.state.receipt,
                    image: filenames[0]
                }
            })
        }
    }
    handleSettingChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleReceiptPrinterConfigChange = (type, config, clear = false) => {
        const oldConfig = clear ? {} : {...this.state.receiptPrinter.config}
        this.setState({
            receiptPrinter: {
                type,
                config: {
                    ...oldConfig,
                    ...config
                }
            }
        })
    }

    handleKitchenPrinterConfigChange = (type, config, clear = false) => {
        const oldConfig = clear ? {} : {...this.state.kitchenPrinter.config}
        this.setState({
            kitchenPrinter: {
                type,
                config: {
                    ...oldConfig,
                    ...config
                }
            }
        })
    }

    render () {
        const { settings, strings, initial, refreshData } = this.props
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
        const displayImageDelete = receipt.image.length > 0 ? 'inline' : 'none'
        return (
            <Dialog actions={actions} modal={initial} onRequestClose={this.onClose} open={settings.open} title={strings.settings} autoScrollBodyContent bodyStyle={{padding: '0'}}>
                <Tabs contentContainerStyle={{padding: '0 24px 24px 24px'}}>
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
                            <MenuItem value='nb' primaryText='Norsk bokmål' />
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
                        /><br /><br />
                        <RaisedButton label='Refresh data' onClick={refreshData} primary />
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
                        /><br /><br />
                        <RaisedButton
                            primary
                            label={strings.select_image}
                            onClick={() => {
                                remote.dialog.showOpenDialog(
                                    {
                                        properties: ['openFile'],
                                        buttonLabel: strings.select,
                                        filters: [
                                            {extensions: ['png'], name: strings.png_image}
                                        ]
                                    },
                                    this.handleReceiptImageChange
                                )
                            }}
                        />
                        <span style={{marginLeft: '10px', display: displayImageDelete}}>
                            {receipt.image}
                            <IconButton style={{marginTop: '-7px', marginLeft: '-10px', position: 'absolute'}} tooltip={strings.clear_image} tooltipPosition='top-center'>
                                <DeleteIcon color={red500} onClick={() => this.handleReceiptImageChange([''])} />
                            </IconButton>
                        </span>
                    </Tab>
                </Tabs>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initial: !getSettings(state).server_address,
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
        refreshData: () => dispatch(getAllKioskData())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsModal)
