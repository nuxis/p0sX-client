import React from 'react'
import { connect } from 'react-redux'
import settings from './common/settings'
import SettingsModal, { open as openSettings } from './common/components/SettingsModal.jsx'
import CreditCheckModal, { open as openCreditCheck } from './Kiosk/components/CreditCheckModal.jsx'
import PreviousOrderModal, { open as openPreviousOrder } from './Kiosk/components/PreviousOrderModal.jsx'
import { NavItem, Icon } from 'react-materialize'
import PaymentModal from './Kiosk/components/PaymentModal.jsx'
import IngredientModal from './Kiosk/components/IngredientModal.jsx'
import SearchBar from './Kiosk/components/SearchBox.jsx'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import { getAllKioskData, cashierLogout } from './Kiosk/actions'
import LockModal, { open as openLockModal } from './Kiosk/components/LockModal'
import ShiftModal from './Kiosk/components/ShiftModal'
import { getLoggedInCashier } from './Kiosk/selectors'
import * as selectors from './Kiosk/selectors'
import receipt from './common/receipt'

const Wrapper = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ]),
        getInitialData: React.PropTypes.func.isRequired,
        logout: React.PropTypes.func.isRequired,
        cashierName: React.PropTypes.string,
        printReceipt: React.PropTypes.func.isRequired
    },

    componentDidMount: function () {
        const { getInitialData } = this.props
        var allSettings = settings.get()
        if (Object.getOwnPropertyNames(allSettings).length === 0) {
            console.log('Need sum config')
            openSettings()
        } else {
            getInitialData()
            openLockModal()
        }
    },
    render: function () {
        const {logout, cashierName, children, printReceipt} = this.props
        return (
            <div>
                <nav>
                    <div className='nav-wrapper'>
                        <a href='#!' className='brand-logo'>p0sX</a>
                        <ul className='left search-list hide-on-med-and-down'>
                            <li><SearchBar /></li>
                        </ul>
                        <ul className='right hide-on-med-and-down'>
                            <li>{cashierName}</li>
                            <NavItem key='receipt' onClick={printReceipt} href='#'>Receipt</NavItem>
                            <NavItem key='undo' onClick={openPreviousOrder} href='#'>Previous order</NavItem>
                            <NavItem key='credit' onClick={openCreditCheck} href='#'>Credit check</NavItem>
                            <NavItem key='logout' onClick={logout} href='#'>Logout</NavItem>
                            <NavItem key='settings' onClick={openSettings} href='#'><Icon>settings</Icon></NavItem>
                        </ul>
                    </div>
                </nav>
                {children}
                <IngredientModal />
                <SettingsModal />
                <PaymentModal />
                <LockModal />
                <ShiftModal />
                <NotificationContainer />
                <PreviousOrderModal />
                <CreditCheckModal />
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    return {
        cashierName: getLoggedInCashier(state).get('name'),
        printReceipt: () => {
            var receiptItems = selectors.getLastCart(state)
            const total = selectors.getTotalPriceOfLastCart(state)
            const id = selectors.getLastOrder(state).get('id')
            receiptItems = receiptItems.map(entry => {
                return {
                    name: entry.get('item').get('name'),
                    price: entry.get('item').get('price')
                }
            }).toJS()
            const receiptConfig = settings.get('receiptPrinter')
            receipt(receiptConfig.type, receiptConfig.config, receiptItems, id, total)
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInitialData: () => dispatch(getAllKioskData()),
        logout: () => {
            dispatch(cashierLogout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
