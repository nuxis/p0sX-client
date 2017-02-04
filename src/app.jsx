import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import { fromJS } from 'immutable'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import Kiosk from './Kiosk/Kiosk'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import settings from './common/settings'

import configureStore from './configureStore'
import Wrapper from './Wrapper'

injectTapEventPlugin()

// Global axios defaults
// eslint-disable-next-line immutable/no-mutation
axios.defaults.baseURL = settings.get('server_address')

// For convenience, transforms the response to ImmutableJS
// eslint-disable-next-line immutable/no-mutation
axios.defaults.transformResponse = axios.defaults.transformResponse.concat((data) => fromJS(data))

// Set auth_token
// eslint-disable-next-line immutable/no-mutation
axios.defaults.headers.common['Authorization'] = `Token ${settings.get('api_auth_token')}`

const store = configureStore(hashHistory)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)

const routes = (
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={history}>
                <Route path='/(!)' component={Wrapper}>
                    <IndexRoute component={Kiosk} />
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>
)

render(routes, document.getElementById('app'))
