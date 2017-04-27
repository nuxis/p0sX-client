import React from 'react'
import { connect } from 'react-redux'
import SettingsModal from './common/components/SettingsModal.jsx'
import CreditCheckModal from './Kiosk/components/CreditCheckModal.jsx'
import PreviousOrderModal from './Kiosk/components/PreviousOrderModal.jsx'
import PaymentModal from './Kiosk/components/PaymentModal.jsx'
import IngredientModal from './Kiosk/components/IngredientModal.jsx'
import SearchBox from './Kiosk/components/SearchBox.jsx'
import { NotificationContainer } from 'react-notifications'
import { getAllKioskData, cashierLogout, toggleSettingsModal, toggleIngredientModal, setLastOrderModalOpen,
    setCreditModalOpen, openAndGetCurrentShift, setLockModalOpen, displayNotification, hideNotification } from './Kiosk/actions'
import { loadStrings } from './actions'
import LockModal from './Kiosk/components/LockModal'
import ShiftModal from './Kiosk/components/ShiftModal'
import * as selectors from './Kiosk/selectors'
import { printReceipt } from './common/print'
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar'
import {cyan500, white} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import ReceiptIcon from 'material-ui/svg-icons/action/receipt'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app'
import CreditIcon from 'material-ui/svg-icons/action/credit-card'
import LastIcon from 'material-ui/svg-icons/navigation/arrow-back'
import CashierIcon from 'material-ui/svg-icons/social/person'
import ShiftIcon from 'material-ui/svg-icons/maps/local-atm'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Snackbar from 'material-ui/Snackbar'

class Wrapper extends React.Component {
    static propTypes = {
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ]),
        getInitialData: React.PropTypes.func.isRequired,
        settingsEmpty: React.PropTypes.bool,
        logout: React.PropTypes.func.isRequired,
        cashierName: React.PropTypes.string,
        printReceipt: React.PropTypes.func.isRequired,
        toggleSettingsModal: React.PropTypes.func.isRequired,
        toggleIngredientModal: React.PropTypes.func.isRequired,
        openLastOrderModal: React.PropTypes.func.isRequired,
        openCreditModal: React.PropTypes.func.isRequired,
        openLockModal: React.PropTypes.func,
        openShiftModal: React.PropTypes.func.isRequired,
        loadStrings: React.PropTypes.func,
        strings: React.PropTypes.object,
        language: React.PropTypes.string,
        notification: React.PropTypes.object,
        hideNotification: React.PropTypes.func
    }

    componentDidUpdate (prevProps) {
        const {language, loadStrings} = this.props
        if (prevProps.language !== language) {
            loadStrings(language)
        }
    }

    componentWillMount () {
        const { getInitialData, toggleSettingsModal, loadStrings, language, settingsEmpty, openLockModal } = this.props
        if (settingsEmpty) {
            loadStrings(language)
            toggleSettingsModal()
        } else {
            loadStrings(language)
            openLockModal()
            getInitialData()
        }
    }

    render () {
        const {logout, cashierName, children, printReceipt, toggleSettingsModal, toggleIngredientModal, strings,
            openLastOrderModal, openCreditModal, openShiftModal, hideNotification, notification} = this.props

        const style = {
            backgroundColor: cyan500
        }

        const titleStyle = {
            color: white,
            marginLeft: '10px',
            fontSize: '25px'
        }

        const buttonStyle = {
            color: white,
            padding: '0',
            margin: '0'
        }

        return (
            <div>
                <Toolbar style={style}>
                    <ToolbarGroup firstChild>
                        <ToolbarTitle style={titleStyle} text='p0sX' />
                        <SearchBox />
                    </ToolbarGroup>
                    <ToolbarGroup lastChild>
                        <FlatButton style={buttonStyle} label={cashierName} disabled icon={<CashierIcon />} />
                        <IconButton tooltip={strings.receipt} iconStyle={buttonStyle} onClick={printReceipt} ><ReceiptIcon /></IconButton>
                        <IconButton tooltip={strings.credit_check} iconStyle={buttonStyle} onClick={openCreditModal} ><CreditIcon /></IconButton>
                        <IconButton tooltip={strings.logout} iconStyle={buttonStyle} onClick={logout} ><LogoutIcon /></IconButton>
                        <IconMenu
                            iconButtonElement={<IconButton iconStyle={buttonStyle}><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        >
                            <MenuItem leftIcon={<LastIcon />} onClick={openLastOrderModal} primaryText={strings.previous_order} />
                            <MenuItem leftIcon={<ShiftIcon />} onClick={openShiftModal} primaryText={strings.manage_shifts} />
                            <MenuItem leftIcon={<SettingsIcon />} onClick={toggleSettingsModal} primaryText={strings.settings} />
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
                {children}
                <NotificationContainer />
                <Snackbar
                    open={notification.open}
                    message={notification.message}
                    autoHideDuration={notification.timeout}
                    onRequestClose={hideNotification}
                    onActionTouchTap={hideNotification}
                    action='hide'
                />
                <SettingsModal toggleOpen={toggleSettingsModal} />
                <IngredientModal toggleOpen={toggleIngredientModal} />
                <PreviousOrderModal />
                <LockModal />
                <PaymentModal />
                <CreditCheckModal />
                <ShiftModal />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cashierName: selectors.getLoggedInCashier(state).get('name'),
        language: selectors.getSettings(state).language,
        strings: selectors.getStrings(state),
        settingsEmpty: selectors.getSettings(state).server_address.length === 0,
        notification: selectors.getNotification(state),
        printReceipt: () => {
            const total = selectors.getTotalPriceOfLastCart(state)
            const settings = selectors.getSettings(state)
            const receiptItems = selectors.getLastCart(state).map(entry => {
                return {
                    name: entry.get('item').get('name'),
                    price: entry.get('item').get('price')
                }
            }).toJS()
            const {receiptPrinter, receipt} = settings
            printReceipt(receiptPrinter.type, receiptPrinter.config, receipt, receiptItems, total, false).then(() => {})
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInitialData: () => dispatch(getAllKioskData()),
        logout: () => dispatch(cashierLogout()),
        toggleSettingsModal: () => dispatch(toggleSettingsModal()),
        toggleIngredientModal: () => dispatch(toggleIngredientModal()),
        loadStrings: (language) => dispatch(loadStrings(language)),
        openLastOrderModal: () => dispatch(setLastOrderModalOpen(true)),
        openCreditModal: () => dispatch(setCreditModalOpen(true)),
        openShiftModal: () => dispatch(openAndGetCurrentShift()),
        openLockModal: () => dispatch(setLockModalOpen(true)),
        hideNotification: () => dispatch(hideNotification()),
        displayNotification: (message, timeout) => dispatch(displayNotification(message, timeout))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
