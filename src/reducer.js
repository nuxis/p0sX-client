import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { categories, selectedCategory, currentItem, cart, items, search, payment, cashier, discounts, creditCheck, lastOrder, shift, lastCart, purchaseInProgress } from './Kiosk/reducer'

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
    purchaseInProgress,
    routing: routerReducer
})
