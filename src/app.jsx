import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import posApp from './reducers'
import AppContainer from './containers/AppContainer'
import thunkMiddleware from 'redux-thunk'

const store = createStore(posApp, applyMiddleware(thunkMiddleware))

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
)
