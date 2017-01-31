import React from 'react'
import { connect } from 'react-redux'
import SettingsModal, { open as openSettings } from './common/components/SettingsModal.jsx'
import CreditCheckModal, { open as openCreditCheck } from './Kiosk/components/CreditCheckModal.jsx'
import PreviousOrderModal, { open as openPreviousOrder } from './Kiosk/components/PreviousOrderModal.jsx'
import PaymentModal from './Kiosk/components/PaymentModal.jsx'
import IngredientModal from './Kiosk/components/IngredientModal.jsx'
import SearchBar from './Kiosk/components/SearchBox.jsx'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import { getAllKioskData, cashierLogout, toggleSettingsModal, updateSettings, toggleIngredientModal } from './Kiosk/actions'
import { loadStrings } from './actions'
import LockModal, { open as openLockModal } from './Kiosk/components/LockModal'
import ShiftModal from './Kiosk/components/ShiftModal'
import * as selectors from './Kiosk/selectors'
import receipt from './common/receipt'

import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar'
import {cyan500, white} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import ReceiptIcon from 'material-ui/svg-icons/action/receipt'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app'

class OpenModal extends React.Component {
    static propTypes = {
        style: React.PropTypes.object,
        modal: React.PropTypes.node.isRequired,
        label: React.PropTypes.string,
        icon: React.PropTypes.node
    }

    render () {
        const {style, label, modal, icon} = this.props

        return (
            <div>
                <FlatButton label={label} style={style} icon={icon} onTouchTap={modal.props.toggleOpen} />
                {modal}
            </div>
        )
    }
}

const Wrapper = React.createClass({
    propTypes: {
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
        loadStrings: React.PropTypes.func,
        strings: React.PropTypes.object,
        language: React.PropTypes.string
    },

    componentDidUpdate: function (prevProps) {
        const {language, loadStrings} = this.props
        if (prevProps.language !== language) {
            loadStrings(language)
        }
    },

    componentWillMount: function () {
        const { getInitialData, toggleSettingsModal, loadStrings, language, settingsEmpty } = this.props
        if (settingsEmpty) {
            loadStrings(language)
            toggleSettingsModal()
        } else {
            loadStrings(language)
            getInitialData()
            // openLockModal()
        }
    },
    render: function () {
        const {logout, cashierName, children, printReceipt, toggleSettingsModal, toggleIngredientModal, strings} = this.props

        const style = {
            backgroundColor: cyan500
        }

        const titleStyle = {
            color: white,
            marginLeft: '10px'
        }

        const buttonStyle = {
            margin: '10px 0 10px 0',
            color: white
        }

        return (
            <div>
                <Toolbar style={style}>
                    <ToolbarGroup firstChild>
                        <ToolbarTitle style={titleStyle} text='p0sX' />
                        <SearchBar />
                    </ToolbarGroup>
                    <ToolbarGroup lastChild>
                        <OpenModal style={buttonStyle} label={strings.settings} icon={<SettingsIcon />} modal={<SettingsModal toggleOpen={toggleSettingsModal} />} />
                        <FlatButton style={buttonStyle} label={strings.receipt} icon={<ReceiptIcon />} onClick={printReceipt} />
                        <FlatButton style={buttonStyle} label={strings.logout} icon={<LogoutIcon />} onClick={logout} />
                    </ToolbarGroup>
                </Toolbar>
                {children}
                <NotificationContainer />
                <IngredientModal toggleOpen={toggleIngredientModal} />
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    return {
        cashierName: selectors.getLoggedInCashier(state).get('name'),
        language: selectors.getSettings(state).language,
        strings: selectors.getStrings(state),
        settingsEmpty: Object.getOwnPropertyNames(selectors.getSettings(state)).length === 1,
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
        },
        toggleSettingsModal: () => {
            dispatch(toggleSettingsModal())
        },
        toggleIngredientModal: () => {
            dispatch(toggleIngredientModal())
        },
        loadStrings: (language) => {
            dispatch(loadStrings(language))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
