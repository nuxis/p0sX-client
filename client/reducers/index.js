const initialState = {
  items: [],
  ingredients: {},
  cart: {
      addedIds: [],
      addedSpecials: [],
      quantityById: {}
  },
  selectedCategory: 0,
  categories: [{
      id: 0,
      name: "All"
  }]
};

const categories = (state, action) => {
    switch (action.type) {
        case 'ADD_CATEGORIES':
            return Object.assign({}, state, {
                categories: [
                    ...state.categories,
                    ...action.categories
                ]
            });
        case 'SET_ACTIVE_CATEGORY':
            return Object.assign({}, state, {
                selectedCategory: action.id
            });
    }
};

function addedIds(state = initialState.cart.addedIds, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            if (state.indexOf(action.item) !== -1) {
                return state
            }
            return [ ...state, action.item ];
        case 'REMOVE_ITEM':
            return state;
        default:
            return state
    }
}

function quantityById(state = initialState.cart.quantityById, action) {
    const { item } = action;
    switch (action.type) {
        case 'ADD_TO_CART':
            return Object.assign({}, state, {
                [item]: (state[item] || 0) + 1
            });
        case 'REMOVE_ITEM':
            if(state[item] != undefined) {
                state[item] > 0 ? state[item]--:state;
            }
            return state;
        default:
            return state
    }
}

const posApp = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
        case 'REMOVE_ITEM':
        case 'ADD_TO_CART':
            return Object.assign({}, state, {
                cart: {
                    addedIds: addedIds(state.cart.addedIds, action),
                    quantityById: quantityById(state.cart.quantityById, action)
                }
            });
        case 'EMPTY_CART':
            return Object.assign({}, state, {
                cart: initialState.cart
            });
        case 'SET_ITEMS':
            return Object.assign({}, state, {
                items: action.items
            });
        case 'SET_INGREDIENTS':
            return Object.assign({}, state, {
                ingredients: action.ingredients
            });
        case 'ADD_CATEGORIES':
        case 'SET_ACTIVE_CATEGORY':
            return categories(state, action);
        default:
            return state
        }
};

export default posApp;