import React from 'react'
import { connect } from 'react-redux'
import settings from './common/settings'
import SettingsModal, { open as openSettings } from './common/components/SettingsModal.jsx'
import { Navbar, NavItem, Icon } from 'react-materialize'
import { Link } from 'react-router'
import IngredientModal from './Kiosk/components/IngredientModal.jsx'

const Wrapper = React.createClass({
    propTypes: {
    },

    componentDidMount: function () {
        var allSettings = settings.get()
        if (Object.getOwnPropertyNames(allSettings).length === 0) {
            console.log('Need sum config')
            openSettings()
        } else {
          // TODO: Write new initialdata
            console.error('Initial data isn ot implemented')
        }
    },

    render: function () {
        return (
            <div>
                <Navbar brand='p0sX' right>
                    <NavItem key='settings' onClick={openSettings} href='#'><Icon>settings</Icon></NavItem>
                    <Link to='/'>Kiosk</Link>
                    <Link to='/kitchen'>Kitchen</Link>
                </Navbar>
                <IngredientModal />
                <SettingsModal />
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
