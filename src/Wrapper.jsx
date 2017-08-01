import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SettingsModal from './common/components/SettingsModal.jsx'
import CreditCheckModal from './Kiosk/components/CreditCheckModal.jsx'
import PreviousOrderModal from './Kiosk/components/PreviousOrderModal.jsx'
import PaymentModal from './Kiosk/components/PaymentModal.jsx'
import IngredientModal from './Kiosk/components/IngredientModal.jsx'
import SearchBox from './Kiosk/components/SearchBox.jsx'
import { NotificationContainer } from 'react-notifications'
import { getAllKioskData, cashierLogout, toggleSettingsModal, toggleIngredientModal, setLastOrderModalOpen,
    setCreditModalOpen, openAndGetCurrentShift, setLockModalOpen } from './Kiosk/actions'
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

class Wrapper extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        getInitialData: PropTypes.func.isRequired,
        settingsEmpty: PropTypes.bool,
        logout: PropTypes.func.isRequired,
        cashierName: PropTypes.string,
        printReceipt: PropTypes.func.isRequired,
        purchaseExists: PropTypes.bool.isRequired,
        hasPreviousOrder: PropTypes.bool.isRequired,
        toggleSettingsModal: PropTypes.func.isRequired,
        toggleIngredientModal: PropTypes.func.isRequired,
        openLastOrderModal: PropTypes.func.isRequired,
        openCreditModal: PropTypes.func.isRequired,
        openLockModal: PropTypes.func,
        openShiftModal: PropTypes.func.isRequired,
        loadStrings: PropTypes.func,
        strings: PropTypes.object,
        language: PropTypes.string
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
            openLastOrderModal, openCreditModal, openShiftModal, purchaseExists, hasPreviousOrder} = this.props

        const loggedIn = cashierName.length > 0

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

        const hideStyle = {
            display: loggedIn ? 'inline-block' : 'none'
        }

        return (
            <div>
                <Toolbar style={style}>
                    <ToolbarGroup firstChild>
                        <ToolbarTitle style={titleStyle} text='p0sX' />
                        <SearchBox />
                    </ToolbarGroup>
                    <ToolbarGroup lastChild>
                        <FlatButton style={buttonStyle} label={cashierName} disabled icon={<CashierIcon style={hideStyle} />} />
                        <IconButton disabled={!loggedIn || !purchaseExists} tooltip={strings.receipt} iconStyle={buttonStyle} onClick={printReceipt} ><ReceiptIcon /></IconButton>
                        <IconButton disabled={!loggedIn} tooltip={strings.credit_check} iconStyle={buttonStyle} onClick={openCreditModal} ><CreditIcon /></IconButton>
                        <IconButton disabled={!loggedIn} tooltip={strings.logout} iconStyle={buttonStyle} onClick={logout} ><LogoutIcon /></IconButton>
                        <IconMenu
                            iconButtonElement={<IconButton disabled={!loggedIn} iconStyle={buttonStyle}><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            disabled={!loggedIn}
                        >
                            <MenuItem disabled={!hasPreviousOrder} leftIcon={<LastIcon />} onClick={hasPreviousOrder ? openLastOrderModal : () => {}} primaryText={strings.previous_order} />
                            <MenuItem leftIcon={<ShiftIcon />} onClick={openShiftModal} primaryText={strings.manage_shifts} />
                            <MenuItem leftIcon={<SettingsIcon />} onClick={toggleSettingsModal} primaryText={strings.settings} />
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>
                {children}
                <NotificationContainer />
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
        cashierName: selectors.getLoggedInCashier(state).name,
        language: selectors.getSettings(state).language,
        strings: selectors.getStrings(state),
        settingsEmpty: !selectors.getSettings(state).server_address,
        notification: selectors.getNotification(state),
        purchaseExists: selectors.getLastCart(state).length > 0,
        hasPreviousOrder: selectors.getLastOrder(state).id !== 0,
        printReceipt: () => {
            const total = selectors.getTotalPriceOfLastCart(state)
            const settings = selectors.getSettings(state)
            const receiptItems = selectors.getLastCart(state).map(entry => {
                return {
                    name: entry.item.name,
                    price: entry.item.price + entry.ingredients.reduce((total, p) => total + p.price, 0)
                }
            })
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
        openLockModal: () => dispatch(setLockModalOpen(true))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
