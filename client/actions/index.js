import axios from 'axios';

const getItems = () => {
    return axios.get('http://127.0.0.1:8000/items/?format=json');
};

const getCategories = () => {
    return axios.get('http://127.0.0.1:8000/categories/?format=json');
};

const getIngredients = () => {
    return axios.get('http://127.0.0.1:8000/ingredients/?format=json');
};

export const setInitialData = () => {
    return (dispatch) => {
        axios.all([getIngredients(), getItems(), getCategories()])
        .then(axios.spread((ingredients, items, categories) => {
            dispatch(setItems(items.data));
            dispatch(setIngredients(ingredients.data));
            dispatch(addCategories(categories.data));
        }));
    }
};

export const addToCart = (item, ingredients) => {
  return {
      type: 'ADD_TO_CART',
      item: item,
      ingredients: ingredients
  }
};

export const setItems = (items) => {
  return {
    type: 'SET_ITEMS',
    items: items
  }
};

export const setIngredients = (ingredients) => {
    return {
        type: 'SET_INGREDIENTS',
        ingredients: ingredients
    }
};

export const addCategories = (categories) => {
  return {
    type: 'ADD_CATEGORIES',
    categories: categories
  }
};

export const emptyCart = () => {
  return {
    type: 'EMPTY_CART'
  }
};

export const removeItem = (item) => {
  return {
    type: 'REMOVE_ITEM',
    item: item
  }
};

export const setActiveCategory = (id) => {
  return {
    type: 'SET_ACTIVE_CATEGORY',
    id: id
  }
};
