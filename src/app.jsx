import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import posApp from './reducers'
import App from './components/App.jsx'
import thunkMiddleware from 'redux-thunk'

const store = createStore(posApp, applyMiddleware(thunkMiddleware))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
