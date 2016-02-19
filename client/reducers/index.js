const initialState = {
  items: [],
  cart: {
      addedIds: [],
      quantityById: {},
      ingredientsById: {}
  },
  selectedCategory: 0,
  categories: [{
      id: 0,
      name: "All"
  }]
};

let nextId = 2;

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

const addedIds = (state = initialState.cart.addedIds, action)=> {
    switch (action.type) {
        case 'ADD_TO_CART':
            if (state.indexOf(action.item) !== -1) {
                return state;
            }
            return [ ...state, action.item ];
        default:
            return state;
    }
};

const quantityById = (state = initialState.cart.quantityById, action) =>{
    switch (action.type) {
        case 'ADD_TO_CART':
            const { item } = action;
            return Object.assign({}, state, {
                [item]: (state[item] || 0) + 1
            });
        default:
            return state
    }
};

const ingredientsById = (state = initialState.cart.ingredientsById, action, items) =>{
    switch (action.type) {
        case 'ADD_TO_CART':
            const item = itemFromId(items, action.item);
            return Object.assign({}, state, {
                [action.item]: item.ingredients
            });
        default:
            return state
    }
};

const itemFromId = (items, id) => {
    for(var i = 0; i < items.length; i++) {
        if(items[i].id === id) {
            return items[i];
        }
    }
    return undefined;
};

const cart = (state, action) => {
    return {
        addedIds: addedIds(state.cart.addedIds, action),
        quantityById: quantityById(state.cart.quantityById, action),
        ingredientsById: ingredientsById(state.cart.ingredientsById, action, state.items)
    }
};

const posApp = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
        case 'ADD_TO_CART':
            return Object.assign({}, state, {
                cart: cart(state, action)
            });
        case 'SET_ITEMS':
            return Object.assign({}, state, {
                items: action.items
            });
        case 'ADD_CATEGORIES':
        case 'SET_ACTIVE_CATEGORY':
            return categories(state, action);
        default:
            return state
        }
};

export default posApp;