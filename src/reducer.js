import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { categories, selectedCategory, currentItem, cart, ingredients, items, search, payment } from './Kiosk/reducer'

export default combineReducers({
    ingredients,
    items,
    selectedCategory,
    categories,
    currentItem,
    cart,
    search,
    payment,
    routing: routerReducer
})
