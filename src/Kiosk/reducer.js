import * as actions from './actions'
import SettingsFile from '../common/settings'
import axios from 'axios'
import { PAYMENT_METHOD } from '../common/api'

// NOTFICATIONS

const notificationInit = {
    open: false,
    message: '',
    timeout: 3000
}

export function notifications (state = notificationInit, action) {
    switch (action.type) {
    case actions.DISPLAY_NOTIFICATION:
        return {
            ...state,
            message: action.message,
            open: true,
            timeout: action.timeout
        }
    case actions.HIDE_NOTIFICATION:
        return notificationInit
    default:
        return state
    }
}

// PURCHASE IN PROGRESS

const inProgressInit = false

export function purchaseInProgress (state = inProgressInit, action) {
    switch (action.type) {
    case actions.SET_PURCHASE_IN_PROGRESS:
        return action.value
    default:
        return state
    }
}

// CREDIT

const creditInit = {
    used: 0,
    credit_limit: 0,
    left: 0,
    modalOpen: false
}

export function creditCheck (state = creditInit, action) {
    switch (action.type) {
    case actions.SET_CREDIT_MODAL_OPEN:
        return {
            ...state,
            modalOpen: action.open
        }
    case actions.SET_CREDIT:
        return {
            ...action.credit,
            modalOpen: state.modalOpen
        }
    case actions.CLEAR_CREDIT_INFO:
        return {
            ...creditInit,
            modalOpen: state.modalOpen
        }
    default:
        return state
    }
}

// END CREDIT

// LAST CART

export function lastCart (state = cartInit, action) {
    switch (action.type) {
    case actions.SET_LAST_CART:
        return action.cart
    default:
        return state
    }
}

// END LAST CART

// LAST ORDER

const lastOrderInit = {
    lines: [],
    id: 0,
    open: false
}

export function lastOrder (state = lastOrderInit, action) {
    switch (action.type) {
    case actions.SET_LAST_ORDER_MODAL_OPEN:
        return {
            ...state,
            open: action.open
        }
    case actions.SET_LAST_ORDER:
        return {
            ...action.cart,
            open: false
        }
    case actions.CLEAR_LAST_ORDER:
        return {
            lines: [],
            id: 0,
            open: false
        }
    default:
        return state
    }
}

// END LAST ORDER

// DISCOUNTS
const discountsInit = []

export function discounts (state = discountsInit, action) {
    switch (action.type) {
    case actions.SET_DISCOUNTS:
        return action.discounts
    default:
        return state
    }
}

// END DISCOUNTS

// SEARCH

const searchInit = ''

export function search (state = searchInit, action) {
    switch (action.type) {
    case actions.SET_SEARCH_VALUE:
        return action.value
    default:
        return state
    }
}

// END SEARCH

// CATEGORIES

const mainCategory = {
    id: 0,
    name: 'All'
}
const categoriesInit = [mainCategory]

export function categories (state = categoriesInit, action) {
    switch (action.type) {
    case actions.SET_CATEGORIES:
        return categoriesInit.concat(action.categories)
    default:
        return state
    }
}

// END CATEGORIES

// SETTINGS

const settingsInit = {
    open: false,
    ...SettingsFile.getAll()
}

export function settings (state = settingsInit, action) {
    switch (action.type) {
    case actions.TOGGLE_SETTINGS_MODAL:
        return {
            ...state,
            open: !state.open
        }
    case actions.UPDATE_SETTINGS:
        SettingsFile.setObject(action.settings)
        if (action.settings.api_auth_token) {
            // eslint-disable-next-line immutable/no-mutation
            axios.defaults.headers.common['Authorization'] = `Token ${action.settings.api_auth_token}`
        }
        if (action.settings.server_address) {
            // eslint-disable-next-line immutable/no-mutation
            axios.defaults.baseURL = action.settings.server_address
        }

        return {
            ...state,
            ...action.settings
        }
    default:
        return state
    }
}

// END SETTINGS

// SELECTEDCATEGORY

const selectedCategoryInit = 0

export function selectedCategory (state = selectedCategoryInit, action) {
    switch (action.type) {
    case actions.SET_ACTIVE_CATEGORY:
        return action.category.id
    default:
        return state
    }
}

// END SELECTEDCATEGORY

// CURRENTITEM

const currentItemInit = {
    // TODO: CHANGE THIS
    // The Item is initiatet here because its needed since we render
    // IngredientModal at init, this behaviour should be changed.
    item: {
        name: 'NOTHING',
        ingredients: []
    },
    ingredients: [],
    message: '',
    modalOpen: false,
    edit: false
}

export function currentItem (state = currentItemInit, action) {
    switch (action.type) {
    case actions.OPEN_INGREDIENT_MODAL_FOR_ITEM:
        return {
            item: action.item,
            ingredients: action.ingredients || action.item.ingredients.filter(i => i.default),
            message: action.message || '',
            modalOpen: true,
            edit: action.edit || false
        }
    case actions.TOGGLE_INGREDIENT:
        if (state.ingredients.includes(action.ingredient)) {
            return {
                ...state,
                ingredients: state.ingredients.filter(i => i.id !== action.ingredient.id)
            }
        } else if (action.ingredient.exclusive) {
            return {
                ...state,
                ingredients: [action.ingredient]
            }
        } else {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    action.ingredient
                ]
            }
        }
    case actions.TOGGLE_INGREDIENT_MODAL:
        return {
            ...state,
            modalOpen: !state.modalOpen
        }
    case actions.ADD_CURRENT_ITEM_TO_CART:
        return currentItemInit
    default:
        return state
    }
}

// END CURRENTITEM

// CART

const cartInit = []

export function cart (state = cartInit, action) {
    switch (action.type) {
    case actions.ADD_ITEM_TO_CART:
        return [
            ...state,
            {
                item: action.item,
                ingredients: [],
                message: ''
            }
        ]
    case actions.ADD_CURRENT_ITEM_TO_CART:
        return [
            ...state,
            {
                item: action.currentItem.item,
                ingredients: action.currentItem.ingredients,
                message: action.message
            }
        ]
    case actions.REMOVE_ITEM_FROM_CART:
        return [
            ...state.slice(0, action.itemIndexInCart),
            ...state.slice(action.itemIndexInCart + 1)
        ]
    case actions.EMPTY_CART:
        return []
    case actions.REMOVE_DISCOUNTS:
        return state.filter(line => line.item.price > 0)
    default:
        return state
    }
}

// END CART

// ITEMS

const itemsInit = []

export function items (state = itemsInit, action) {
    switch (action.type) {
    case actions.SET_ITEMS:
        return action.items
    default:
        return state
    }
}

// END ITEMS

// PAYMENT

const paymentInit = {
    stateIndex: 1,
    paymentMethod: PAYMENT_METHOD.CREDIT,
    modalOpen: false
}

export function payment (state = paymentInit, action) {
    switch (action.type) {
    case actions.SET_PAYMENT_MODAL_OPEN:
        return {
            ...state,
            modalOpen: action.open
        }
    case actions.SET_PAYMENT_STATE:
        return {
            ...state,
            stateIndex: action.state
        }
    case actions.SET_PAYMENT_METHOD:
        return {
            ...state,
            paymentMethod: action.method
        }
    default:
        return state
    }
}

// END PAYMENT

// CASHIER

const cashierInit = {
    locked: false,
    card: '',
    name: ''
}

export function cashier (state = cashierInit, action) {
    switch (action.type) {
    case actions.SET_LOCK_MODAL_OPEN:
        return {
            ...state,
            locked: action.open
        }
    case actions.CASHIER_CLEAR:
        return {
            locked: true,
            card: '',
            name: ''
        }
    case actions.CASHIER_SUCCESS:
        return {
            locked: false,
            card: action.crew.card,
            name: `${action.crew.first_name} ${action.crew.last_name}`
        }
    default:
        return state
    }
}

// END CASHIER

// SHIFT

const shiftInit = {
    cash: 0,
    crew: 0,
    card: 0,
    vipps: 0,
    mcash: 0,
    mobilepay: 0,
    izettle: 0,
    undo: 0,
    start: '2016-01-01T00:00:00.000000Z',
    modalOpen: false
}

export function shift (state = shiftInit, action) {
    switch (action.type) {
    case actions.SET_SHIFT_MODAL_OPEN:
        return {
            ...state,
            modalOpen: action.open
        }
    case actions.SET_CURRENT_SHIFT:
        return {
            ...action.shift,
            modalOpen: state.modalOpen
        }
    default:
        return state
    }
}

// END SHIFT
