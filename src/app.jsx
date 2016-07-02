import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import posApp from './reducers'
import AppContainer from './containers/AppContainer'
import thunkMiddleware from 'redux-thunk'
import 'materialize-css'
// CSS
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'materialize-css/bin/materialize.css'
import './css/style.css'

const store = createStore(posApp, applyMiddleware(thunkMiddleware))

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
)
