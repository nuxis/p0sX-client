const initialState = {
  items: [],
  ingredients: [],
  cart: [],
  selectedCategory: 0,
  categories: [{
      id: 0,
      name: "All"
  }]
};

const categories = (state, action) => {
    switch (action.type) {
        case 'ADD_CATEGORIES':
           return [
                ...state,
                ...action.categories
           ];
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

function cart(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [ ...state, {
                id: action.item,
                ingredients: action.ingredients
            }];
        case 'REMOVE_ITEM':
            return [
                ...state.slice(0, action.item),
                ...state.slice(action.item + 1)
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
            return action.ingredients;
        default:
            return state;
    }
}

function items(state, action) {
    switch (action.type) {
        case 'SET_ITEMS':
            return Object.assign([], action.items);
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
        categories: categories(state.categories, action)
    });
};