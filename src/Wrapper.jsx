import React from 'react'
import { connect } from 'react-redux'
import settings from './common/settings'
import SettingsModal, { open as openSettings } from './common/components/SettingsModal.jsx'
import { NavItem, Icon } from 'react-materialize'
import PaymentModal from './Kiosk/components/PaymentModal.jsx'
import IngredientModal from './Kiosk/components/IngredientModal.jsx'
import SearchBar from './Kiosk/components/SearchBox.jsx'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

const Wrapper = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ])
    },

    componentDidMount: function () {
        var allSettings = settings.get()
        if (Object.getOwnPropertyNames(allSettings).length === 0) {
            console.log('Need sum config')
            openSettings()
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
                            <NavItem key='settings' onClick={openSettings} href='#'><Icon>settings</Icon></NavItem>
                            <NavItem key='kiosk' href='#/'>Kiosk</NavItem>
                            <NavItem key='kitchen' href='#/kitchen'>Kitchen</NavItem>
                        </ul>
                    </div>
                </nav>
                {this.props.children}
                <IngredientModal />
                <SettingsModal />
                <PaymentModal />
                <NotificationContainer />
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
