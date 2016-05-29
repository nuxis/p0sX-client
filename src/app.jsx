import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import 'materialize-css'
// CSS
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'materialize-css/bin/materialize.css'
import './css/style.css'

import { Provider, connect } from 'react-redux'
import Kiosk from './containers/Kiosk'
import Kitchen from './containers/Kitchen'
import IngredientModal from './components/IngredientModal.jsx'
import SettingsModal, { open as openSettings } from './components/SettingsModal.jsx'
import {Navbar, NavItem, Icon} from 'react-materialize'
import { Router, Route, IndexRoute, Link } from 'react-router'
import store, {history} from './store'
import settings from './settings'
import { setInitialData } from './actions'

const Wrapper = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.node),
            React.PropTypes.node
        ]),
        getInitialData: React.PropTypes.func.isRequired
    },
    componentDidMount: function () {
        var allSettings = settings.get()
        if (Object.getOwnPropertyNames(allSettings).length === 0) {
            console.log('Need sum config')
            openSettings()
        } else {
            this.props.getInitialData()
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
                {this.props.children}
                <IngredientModal />
                <SettingsModal />
            </div>
        )
    }
})


const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInitialData: () => {
            dispatch(setInitialData())
        }
    }
}

const routes = (
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={connect(mapStateToProps, mapDispatchToProps)(Wrapper)}>
                <IndexRoute component={Kiosk}/>
                <Route path='kitchen' component={Kitchen}/>
                <Route path='customer' component={Kitchen}/>
            </Route>
        </Router>
    </Provider>
)
render(routes, document.getElementById('app'))
