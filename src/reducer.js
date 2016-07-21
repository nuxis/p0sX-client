import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { categories, selectedCategory, currentItem, cart, ingredients, items } from './Kiosk/reducer'

export default combineReducers({
    ingredients,
    items,
    selectedCategory,
    categories,
    currentItem,
    cart,
    routing: routerReducer
})
