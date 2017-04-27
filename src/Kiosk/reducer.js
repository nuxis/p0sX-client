import { List, Map } from 'immutable'
import * as actions from './actions'
import SettingsFile from '../common/settings'
import axios from 'axios'

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

const creditInit = Map({
    used: 0,
    credit_limit: 0,
    left: 0,
    modalOpen: false
})

export function creditCheck (state = creditInit, action) {
    switch (action.type) {
    case actions.SET_CREDIT_MODAL_OPEN:
        return state.set('modalOpen', action.open)
    case actions.SET_CREDIT:
        return action.credit.set('modalOpen', state.get('modalOpen'))
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

const lastOrderInit = Map({
    lines: List(),
    id: 0,
    open: false
})

export function lastOrder (state = lastOrderInit, action) {
    switch (action.type) {
    case actions.SET_LAST_ORDER_MODAL_OPEN:
        return state.set('open', action.open)
    case actions.SET_LAST_ORDER:
        return action.cart.set('open', false)
    case actions.CLEAR_LAST_ORDER:
        return Map({
            lines: List(),
            id: 0,
            open: false
        })
    default:
        return state
    }
}

// END LAST ORDER

// DISCOUNTS
const discountsInit = List()

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

const mainCategory = new Map({
    id: 0,
    name: 'All'
})
const categoriesInit = List().push(mainCategory)

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
    ...SettingsFile.get()
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
        return action.category.get('id')
    default:
        return state
    }
}

// END SELECTEDCATEGORY

// CURRENTITEM

const currentItemInit = new Map({
    // TODO: CHANGE THIS
    // The Item is initiatet here because its needed since we render
    // IngredientModal at init, this behaviour should be changed.
    item: Map({
        name: 'NOTHING',
        ingredients: List()
    }),
    ingredients: List(),
    message: '',
    modalOpen: false,
    edit: false
})

export function currentItem (state = currentItemInit, action) {
    switch (action.type) {
    case actions.OPEN_INGREDIENT_MODAL_FOR_ITEM:
        return new Map({
            item: action.item,
            ingredients: action.ingredients || action.item.get('ingredients').filter(i => i.get('default')),
            message: action.message || '',
            modalOpen: true,
            edit: action.edit || false
        })
    case actions.TOGGLE_INGREDIENT:
        if (state.get('ingredients').includes(action.ingredient)) {
            return state.set('ingredients', state.get('ingredients').filter(i => i.get('id') !== action.ingredient.get('id')))
        } else {
            return state.set('ingredients', state.get('ingredients').push(action.ingredient))
        }
    case actions.TOGGLE_INGREDIENT_MODAL:
        return state.set('modalOpen', !state.get('modalOpen'))
    case actions.ADD_CURRENT_ITEM_TO_CART:
        return currentItemInit
    default:
        return state
    }
}

// END CURRENTITEM

// CART

const cartInit = new List()

export function cart (state = cartInit, action) {
    switch (action.type) {
    case actions.ADD_ITEM_TO_CART:
        return state.push(
            Map({
                item: action.item,
                ingredients: List(),
                message: ''
            })
      )
    case actions.ADD_CURRENT_ITEM_TO_CART:
        return state.push(
            Map({
                item: action.currentItem.get('item'),
                ingredients: action.currentItem.get('ingredients'),
                message: action.message
            })
      )
    case actions.REMOVE_ITEM_FROM_CART:
        return state.remove(action.itemIndexInCart)
    case actions.EMPTY_CART:
        return new List()
    case actions.REMOVE_DISCOUNTS:
        return state.filter(line => line.get('item').get('price') > 0)
    default:
        return state
    }
}

// END CART

// ITEMS

const itemsInit = new List()

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

const paymentInit = new Map({
    stateIndex: 0,
    paymentMethod: 0,
    modalOpen: false
})

export function payment (state = paymentInit, action) {
    switch (action.type) {
    case actions.SET_PAYMENT_MODAL_OPEN:
        return state.set('modalOpen', action.open)
    case actions.SET_PAYMENT_STATE:
        return state.set('stateIndex', action.state)
    case actions.SET_PAYMENT_METHOD:
        return state.set('paymentMethod', action.method)
    default:
        return state
    }
}

// END PAYMENT

// CASHIER

const cashierInit = new Map({
    locked: false,
    card: '',
    name: ''
})

export function cashier (state = cashierInit, action) {
    switch (action.type) {
    case actions.SET_LOCK_MODAL_OPEN:
        return state.set('locked', action.open)
    case actions.CASHIER_CLEAR:
        return new Map({
            locked: true,
            card: '',
            name: ''
        })
    case actions.CASHIER_SUCCESS:
        return new Map({
            locked: false,
            card: action.crew.get('card'),
            name: `${action.crew.get('first_name')} ${action.crew.get('last_name')}`
        })
    default:
        return state
    }
}

// END CASHIER

// SHIFT

const shiftInit = new Map({
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
})

export function shift (state = shiftInit, action) {
    switch (action.type) {
    case actions.SET_SHIFT_MODAL_OPEN:
        return state.set('modalOpen', action.open)
    case actions.SET_CURRENT_SHIFT:
        return action.shift.set('modalOpen', state.get('modalOpen'))
    default:
        return state
    }
}

// END SHIFT
