import { routerReducer } from 'react-router-redux'

function categories (state = [], action) {
    switch (action.type) {
    case 'ADD_CATEGORIES':
        return [
            ...state,
            ...action.categories
        ]
    default:
        return state
    }
}

function selectedCategory (state = 0, action) {
    switch (action.type) {
    case 'SET_ACTIVE_CATEGORY':
        return action.id
    default:
        return state
    }
}

function currentItem (state = {}, action, items) {
    switch (action.type) {
    case 'SET_ACTIVE_ITEM':
        var item = items.find(item => item.id === action.item)
        return {
            id: item.id,
            ingredients: item.ingredients ? [...item.ingredients] : []
        }
    case 'TOGGLE_INGREDIENT':
        var index = state.ingredients.indexOf(action.id)
        if (index !== -1) {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.slice(0, index),
                    ...state.ingredients.slice(index + 1)
                ]
            }
        } else {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    action.id
                ]
            }
        }
    case 'ADD_CURRENT_TO_CART':
        return {
            id: 0,
            ingredients: []
        }
    default:
        return state
    }
}

function cart (state = [], action, currentItem) {
    switch (action.type) {
    case 'ADD_TO_CART':
        return [
            ...state,
            {
                item: action.id,
                ingredients: action.ingredients
            }
        ]
        case 'ADD_CURRENT_TO_CART':
        return [
            ...state,
            {
                item: currentItem.id,
                ingredients: currentItem.ingredients ? [...currentItem.ingredients] : []
            }
        ]
    case 'REMOVE_ITEM':
        return [
            ...state.slice(0, action.id),
            ...state.slice(action.id + 1)
        ]
    case 'EMPTY_CART':
        return []
    default:
        return state
    }
}

function ingredients (state = [], action) {
    switch (action.type) {
    case 'SET_INGREDIENTS':
        return [...action.ingredients]
    default:
        return state
    }
}

function items (state = [], action) {
    switch (action.type) {
    case 'SET_ITEMS':
        return [...action.items]
    default:
        return state
    }
}

function rootReducer (state, action) {
    console.log(state)
    return {
        ingredients: ingredients(state.ingredients, action),
        items: items(state.items, action),
        selectedCategory: selectedCategory(state.selectedCategory, action),
        categories: categories(state.categories, action),
        currentItem: currentItem(state.currentItem, action, state.items),
        cart: cart(state.cart, action, state.currentItem),
        routing: routerReducer(state.routing, action)
    }
}
export default rootReducer

