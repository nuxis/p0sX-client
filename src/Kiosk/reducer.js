import { List, Map } from 'immutable'
import * as actions from './actions'

// CREDIT

const creditInit = Map({
    used: 0,
    credit_limit: 0,
    left: 0
})

export function creditCheck (state = creditInit, action) {
    switch (action.type) {
    case actions.SET_CREDIT:
        return action.credit
    default:
        return state
    }
}

// END CREDIT

// LAST ORDER

const lastOrderInit = Map({
    lines: List(),
    id: 0
})

export function lastOrder (state = lastOrderInit, action) {
    switch (action.type) {
    case actions.SET_LAST_ORDER:
        return action.cart
    case actions.CLEAR_LAST_ORDER:
        return Map({
            lines: List(),
            id: 0
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
    ingredients: List()
})

export function currentItem (state = currentItemInit, action) {
    switch (action.type) {
    case actions.OPEN_INGREDIENT_MODAL_FOR_ITEM:
        return new Map({
            item: action.item,
            ingredients: action.item.get('ingredients').filter(i => i.get('default'))
        })
    case actions.TOGGLE_INGREDIENT:
        if (state.get('ingredients').includes(action.ingredient)) {
            return state.set('ingredients', state.get('ingredients').filter(i => i.get('id') !== action.ingredient.get('id')))
        } else {
            return state.set('ingredients', state.get('ingredients').push(action.ingredient))
        }

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
                ingredients: List()
            })
      )
    case actions.ADD_CURRENT_ITEM_TO_CART:
        return state.push(
            Map({
                item: action.currentItem.get('item'),
                ingredients: action.currentItem.get('ingredients')
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
    state: -1
})

export function payment (state = paymentInit, action) {
    switch (action.type) {
    case actions.SET_PAYMENT_STATE:
        return state.set('state', action.state)
    default:
        return state
    }
}

// END PAYMENT

// CASHIER

const cashierInit = new Map({
    locked: true,
    card: '',
    name: ''
})

export function cashier (state = cashierInit, action) {
    switch (action.type) {
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
