import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { categories, selectedCategory, currentItem, cart, items, search, payment, cashier, discounts, creditCheck, lastOrder, shift, lastCart } from './Kiosk/reducer'

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
    shift,
    lastCart,
    routing: routerReducer
})
