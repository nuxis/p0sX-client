import React from 'react'
import VisibleItemList from '../containers/VisibleItemList'
import CategoryContainer from '../containers/CategoryContainer'
import VisibleCartList from '../containers/VisibleCartList'
import {Navbar, NavItem, Icon} from 'react-materialize'
import IngredientModal from './IngredientModal.jsx'
import SettingsModal from './SettingsModal.jsx'
import settings from '../settings'

const App = React.createClass({
    componentDidMount: function () {
        var allSettings = settings.get()
        if (Object.getOwnPropertyNames(allSettings).length === 0) {
            console.log('Need sum config')
            $('#settings-modal').openModal()
        } else {
            this.props.getInitialData()
        }
    },
    propTypes: {
        getInitialData: React.PropTypes.func.isRequired,
        openSettings: React.PropTypes.func.isRequired
    },
    render: function () {
        const { openSettings } = this.props
        return (
            <div>
                <Navbar brand='p0sX' right>
                    <NavItem key='settings' onClick={openSettings} href='#'><Icon>settings</Icon></NavItem>
                </Navbar>
                <div id='content' className='row pos-container'>
                    <CategoryContainer />
                    <VisibleItemList />
                    <VisibleCartList />
                </div>
                <IngredientModal />
                <SettingsModal />
            </div>
        )
    }
})

export default App
