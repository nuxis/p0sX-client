const initialState = {
    items: [],
    ingredients: [],
    cart: [],
    selectedCategory: 0,
    categories: [{
        id: 0,
        name: "All"
    }],
    currentItem: 1
};

const categories = (state, action) => {
    switch (action.type) {
        case 'ADD_CATEGORIES':
           return Object.assign([], [
                ...state,
                ...action.categories
           ]);
        default:
            return state;
    }
};

const selectedCategory = (state, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_CATEGORY':
            return action.id;
        default:
            return state;
    }
};

const currentItem = (state, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_ITEM':
            return action.item;
        default:
            return state;
    }
};

function cart(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [
                ...state,
                {
                    id: action.id,
                    ingredients: action.ingredients
                }
            ];
        case 'REMOVE_ITEM':
            return [
                ...state.slice(0, action.id),
                ...state.slice(action.id + 1)
            ];
        case 'EMPTY_CART':
            return [];
        default:
            return state
    }
}

function ingredients(state, action) {
    switch (action.type) {
        case 'SET_INGREDIENTS':
            return [...action.ingredients];
        default:
            return state;
    }
}

function items(state, action) {
    switch (action.type) {
        case 'SET_ITEMS':
            return [...action.items];
        default:
            return state;
    }
}

export default (state = initialState, action) => {
    return Object.assign({}, state, {
        cart: cart(state.cart, action),
        selectedCategory: selectedCategory(state.selectedCategory, action),
        ingredients: ingredients(state.ingredients, action),
        items: items(state.items, action),
        categories: categories(state.categories, action),
        currentItem: currentItem(state.currentItem, action)
    });
};

export const getItemById = (state, id) => {
    var f = {};
    state.items.forEach(i => {
        if(i.id == id)
            f = i;
    });
    return f;
};

export const getIngredientById = (state, id) => {
    var f = {};
    state.ingredients.forEach(i => {
        if(i.id == id)
            f = i;
    });
    return f;
};