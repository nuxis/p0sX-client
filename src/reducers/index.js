const initialState = {
    items: [],
    ingredients: [],
    cart: [],
    selectedCategory: 0,
    categories: [{
        id: 0,
        name: 'All'
    }],
    currentItem: {
        id: 0,
        ingredients: []
    }
}

const categories = (state, action) => {
    switch (action.type) {
    case 'ADD_CATEGORIES':
        return Object.assign([], [
            ...state,
            ...action.categories
        ])
    default:
        return state
    }
}

const selectedCategory = (state, action) => {
    switch (action.type) {
    case 'SET_ACTIVE_CATEGORY':
        return action.id
    default:
        return state
    }
}

const currentItem = (state, action, item) => {
    switch (action.type) {
    case 'SET_ACTIVE_ITEM':
        return {
            id: action.item,
            ingredients: Object.assign([], item.ingredients)
        }
    case 'TOGGLE_INGREDIENT':
        var index = state.ingredients.indexOf(action.id)
        if (index !== -1) {
            return Object.assign({}, state, {
                ingredients: [
                    ...state.ingredients.slice(0, index),
                    ...state.ingredients.slice(index + 1)
                ]
            })
        } else {
            return Object.assign({}, state, {
                ingredients: [
                    ...state.ingredients,
                    action.id
                ]
            })
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

function cart (state, action, currentItem) {
    switch (action.type) {
    case 'ADD_TO_CART':
        return [
            ...state,
            {
                id: action.id,
                ingredients: action.ingredients
            }
        ]
    case 'ADD_CURRENT_TO_CART':
        return [
            ...state,
            {
                id: currentItem.id,
                ingredients: Object.assign([], currentItem.ingredients)
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

function ingredients (state, action) {
    switch (action.type) {
    case 'SET_INGREDIENTS':
        return [...action.ingredients]
    default:
        return state
    }
}

function items (state, action) {
    switch (action.type) {
    case 'SET_ITEMS':
        return [...action.items]
    default:
        return state
    }
}

export default (state = initialState, action) => {
    var s = Object.assign({}, state, {
        cart: cart(state.cart, action, state.currentItem),
        selectedCategory: selectedCategory(state.selectedCategory, action),
        ingredients: ingredients(state.ingredients, action),
        items: items(state.items, action),
        categories: categories(state.categories, action),
        currentItem: currentItem(state.currentItem, action, getItemById(state, action.item))
    })
    console.log(s)
    return s
}

const getItemById = (state, id) => {
    var f = {}
    state.items.forEach((i) => {
        if (i.id === id) {
            f = i
        }
    })
    return f
}

const getIngredientById = (state, id) => {
    var f = {}
    state.ingredients.forEach((i) => {
        if (i.id === id) {
            f = i
        }
    })
    return f
}

export {
    getItemById,
    getIngredientById
}
