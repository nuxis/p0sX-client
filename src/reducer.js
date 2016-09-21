import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { categories, selectedCategory, currentItem, cart, items, search, payment, discounts } from './Kiosk/reducer'

export default combineReducers({
    items,
    selectedCategory,
    categories,
    currentItem,
    cart,
    search,
    payment,
    discounts,
    routing: routerReducer
})
