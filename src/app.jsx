import React from 'react'
import electron from 'electron'
import { render } from 'react-dom'
import axios from 'axios'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import Kiosk from './Kiosk/Kiosk'
import settings from './common/settings'

import configureStore from './configureStore'
import Wrapper from './Wrapper'

injectTapEventPlugin()

// Disables zoom
// electron.webFrame.setZoomLevelLimits(1, 1) // TODO fix? / Needed?

// Global axios defaults
// eslint-disable-next-line immutable/no-mutation
axios.defaults.baseURL = settings.get('server_address')

// For convenience, transforms the response to ImmutableJS
// eslint-disable-next-line immutable/no-mutation
axios.defaults.transformResponse = axios.defaults.transformResponse.concat((data) => data)

// Set auth_token
// eslint-disable-next-line immutable/no-mutation
axios.defaults.headers.common['Authorization'] = `Token ${settings.get('api_auth_token')}`

const store = configureStore()

const routes = (
    <MuiThemeProvider>
        <Provider store={store}>
            <Wrapper>
                <Kiosk />
            </Wrapper>
        </Provider>
    </MuiThemeProvider>
)

render(routes, document.getElementById('app'))
