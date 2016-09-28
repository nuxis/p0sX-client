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
import { getAllKioskData } from './Kiosk/actions'
import LockModal, { open as openLockModal } from './Kiosk/components/LockModal'
import ShiftModal, { open as openShiftModal } from './Kiosk/components/ShiftModal'
import { cashierLogout } from './Kiosk/actions'
import { getLoggedInCashier } from './Kiosk/selectors'

const Wrapper = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ]),
        getInitialData: React.PropTypes.func.isRequired
        logout: React.PropTypes.func.isRequired,
        cashierName: React.PropTypes.string
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
        return (
            <div>
                <nav>
                    <div className='nav-wrapper'>
                        <a href='#!' className='brand-logo'>p0sX</a>
                        <ul className='left search-list hide-on-med-and-down'>
                            <li><SearchBar /></li>
                        </ul>
                        <ul className='right hide-on-med-and-down'>
                            <li>{this.props.cashierName}</li>
                            <NavItem key='settings' onClick={openSettings} href='#'><Icon>settings</Icon></NavItem>
                            <NavItem key='undo' onClick={openPreviousOrder} href='#'>Previous order</NavItem>
                            <NavItem key='credit' onClick={openCreditCheck} href='#'>Credit check</NavItem>
                            <NavItem key='shift' onClick={openShiftModal} href='#'>Shift</NavItem>
                            <NavItem key='logout' onClick={::this.props.logout} href='#'>Logout</NavItem>
                            <NavItem key='settings' onClick={openSettings} href='#'><Icon>settings</Icon></NavItem>
                        </ul>
                    </div>
                </nav>
                {this.props.children}
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
        cashierName: getLoggedInCashier(state).get('name')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInitialData: () => dispatch(getAllKioskData())
        logout: () => {
            dispatch(cashierLogout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
