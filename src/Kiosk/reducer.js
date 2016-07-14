import { List, Map } from 'immutable'
import * as actions from './actions'

// CATEGORIES

const categoriesInit = new List()

export function categories (state = categoriesInit, action) {
    console.log('categories state: ', state, action)
    switch (action.type) {
    case actions.SET_CATEGORIES:
        return action.categories
    default:
        return state
    }
}

// END CATEGORIES

// SELECTEDCATEGORY

const selectedCategoryInit = 0

export function selectedCategory (state = selectedCategoryInit, action) {
    console.log('selectedCategory state: ', state, action)
    switch (action.type) {
    case actions.SET_ACTIVE_CATEGORY:
        return action.category.id
    default:
        return state
    }
}

// END SELECTEDCATEGORY

// CURRENTITEM

const currentItemInit = new Map({
    ingredients: List()
})

export function currentItem (state = currentItemInit, action) {
    console.log('currentItem state: ', state, action)
    switch (action.type) {
    case actions.OPEN_INGREDIENT_MODAL_FOR_ITEM:
        return new Map({
            item: action.item,
            ingredients: List()
        })
    case actions.TOGGLE_INGREDIENT:
        if (state.get('ingredients').includes(action.ingredient)) {
            return state.get('ingredients').remove(action.ingredient)
        } else {
            return state.get('ingredients').push(action.ingredient)
        }

    case actions.ADD_CURRENT_ITEM_TO_CART:
        return Map({
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
    console.log('cart state: ', state, action)
    switch (action.type) {
    case actions.ADD_ITEM_TO_CART:
        return state.push(
            {
                item: action.item,
                ingredients: List()
            }
      )
    case actions.ADD_CURRENT_ITEM_TO_CART:
        return state.push(
            {
                item: action.currentItem.item,
                ingredients: action.currentItem.ingredients
            }
      )
    case actions.REMOVE_ITEM_FROM_CART:
        return state.remove(action.cartItem)
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
    console.log('ingredients state:', state, action)
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
    console.log('items state:', state, action)
    switch (action.type) {
    case actions.SET_ITEMS:
        return action.items
    default:
        return state
    }
}

// END ITEMS
