import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { categories, selectedCategory, currentItem, cart, items, search, payment, cashier, discounts, creditCheck, lastOrder, shift, lastCart, purchaseInProgress, settings, notifications } from './Kiosk/reducer'
import * as actions from './actions'
import getStrings from './strings'

const stringsInit = {}
export function strings (state = stringsInit, action) {
    switch (action.type) {
    case actions.LOAD_STRINGS:
        return getStrings(action.language)
    default:
        return state
    }
}

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
    settings,
    notifications,
    strings,
    routing: routerReducer
})
