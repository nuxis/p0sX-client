import { List, Map } from 'immutable'
import * as actions from './actions'

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
        name: 'NOTHING'
    }),
    ingredients: List()
})

export function currentItem (state = currentItemInit, action) {
    switch (action.type) {
    case actions.OPEN_INGREDIENT_MODAL_FOR_ITEM:
        return new Map({
            item: action.item,
            ingredients: List()
        })
    case actions.TOGGLE_INGREDIENT:
        if (state.get('ingredients').includes(action.ingredient)) {
            return state.set('ingredients', state.get('ingredients').filter(i => i.get('id') !== action.ingredient.get('id')))
        } else {
            return state.set('ingredients', state.get('ingredients').push(action.ingredient))
        }

    case actions.ADD_CURRENT_ITEM_TO_CART:
        return Map({
            item: Map({
                name: 'NOTHING'
            }),
            ingredients: new List()
        })
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
    default:
        return state
    }
}

// END CART

// INGREDIENTS

const ingredientsInit = new List()

export function ingredients (state = ingredientsInit, action) {
    switch (action.type) {
    case actions.SET_INGREDIENTS:
        return action.ingredients
    default:
        return state
    }
}

// END IGREDIENTS

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
    state: 'select'
})

export function payment (state = paymentInit, action) {
    console.log('payment state:', state, action)
    switch (action.type) {
    case actions.SET_PAYMENT_STATE:
        return state.set('state', action.state)
    default:
        return state
    }
}

// END PAYMENT
