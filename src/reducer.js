import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { categories, selectedCategory, currentItem, cart, items, search, payment, cashier, discounts, creditCheck } from './Kiosk/reducer'

export default combineReducers({
    items,
    selectedCategory,
    categories,
    currentItem,
    cart,
    search,
    payment,
    discounts,
    lastOrder,
    creditCheck,
    cashier,
    routing: routerReducer
})
