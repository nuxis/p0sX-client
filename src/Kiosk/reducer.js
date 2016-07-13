import { List, Map } from 'immutable'

// CATEGORIES

const categoriesInit = new List()

export function categories (state = categoriesInit, action) {
    switch (action.type) {
    case 'ADD_CATEGORIES':
        return state.concat(action.categories)
    default:
        return state
    }
}

// END CATEGORIES

// SELECTEDCATEGORY

const selectedCategoryInit = 0

export function selectedCategory (state = selectedCategoryInit, action) {
    switch (action.type) {
    case 'SET_ACTIVE_CATEGORY':
        return action.id
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
    switch (action.type) {
    case 'SET_ACTIVE_ITEM':
        const item = items.find(item => item.id === action.item)
        return {
            id: item.id,
            ingredients: item.ingredients ? List.of(item.ingredients) : new List()
        }
    case 'TOGGLE_INGREDIENT':
        console.log(action)
        if (state.ingredients.includes(action.ingredient)) {
            return state.get('ingredients').remove(action.ingredient)
        } else {
            return state.get('ingredients').push(action.ingredient)
        }

    case 'ADD_CURRENT_TO_CART':
        return {
            id: 0,
            ingredients: new List()
        }
    default:
        return state
    }
}

// END CURRENTITEM

// CART

const cartInit = new List()

export function cart (state = cartInit, action) {
    switch (action.type) {
    case 'ADD_TO_CART':
        return state.push(
            {
                item: action.id,
                ingredients: List.of(action.ingredients)
            }
      )
    case 'ADD_CURRENT_TO_CART':
        return state.push(
            {
                item: currentItem.id,
                ingredients: currentItem.ingredients ? List.of(currentItem.ingredients) : new List()
            }
      )
    case 'REMOVE_ITEM':
        return state.remove(action.id)
    case 'EMPTY_CART':
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
    case 'SET_INGREDIENTS':
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
    case 'SET_ITEMS':
        return action.items
    default:
        return state
    }
}

// END ITEMS
