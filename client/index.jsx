import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux'
import posApp from './reducers'
import App from './components/App.jsx'
import { setItems, addCategories } from './actions';
import axios from 'axios';
import thunk from 'redux-thunk';

let store = createStore(posApp, applyMiddleware(thunk));

var setItemsAsync = () => {
    axios.get('http://127.0.0.1:8000/items/?format=json')
    .then(function (response) {
        store.dispatch(setItems(response.data));
    })
    .catch(function (response) {
        console.log(response);
    });
};

setItemsAsync();
   
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);