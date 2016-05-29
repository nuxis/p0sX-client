import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { syncHistoryWithStore } from 'react-router-redux'
import { createMemoryHistory } from 'react-router'

const initialState = {
    items: [],
    ingredients: [],
    cart: [],
    selectedCategory: 0,
    categories: [{
        id: 0,
        name: 'All'
    }],
    currentItem: {
        id: 0,
        ingredients: []
    }
}

const store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
const history = syncHistoryWithStore(createMemoryHistory(), store)

const getCurrentItem = () => {
    return store.getState().currentItem
}

const getItemById = (id) => {
    var state = store.getState()
    var item = {}
    state.items.forEach((i) => {
        if (i.id === id) {
            item = i
        }
    })
    return item
}

const getIngredientById = (id) => {
    var f = {}
    var state = store.getState()
    state.ingredients.forEach((i) => {
        if (i.id === id) {
            f = i
        }
    })
    return f
}

export default store
export {
    history,
    getCurrentItem,
    getItemById,
    getIngredientById
}
