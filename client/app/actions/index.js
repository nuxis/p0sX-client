import axios from 'axios';
import settings from '../settings'

let BASE_ADDRESS = settings.get('server_address')

console.log(settings)

const getItems = () => {
    return axios.get(`${BASE_ADDRESS}/items/?format=json`)
}

const getCategories = () => {
    return axios.get(`${BASE_ADDRESS}/categories/?format=json`);
};

const getIngredients = () => {
    return axios.get(`${BASE_ADDRESS}/ingredients/?format=json`);
};

export const setInitialData = () => {
    return (dispatch) => {
        axios.all([getIngredients(), getItems(), getCategories()])
        .then(axios.spread((ingredients, items, categories) => {
            dispatch(addCategories(categories.data));
            dispatch(setItems(items.data));
            dispatch(setIngredients(ingredients.data));
        }));
    }
};

export const addCurrentItemToCart = () => {
    return {
        type: 'ADD_CURRENT_TO_CART'
    }
};

export const addToCart = (item, ingredients = []) => {
    return {
        type: 'ADD_TO_CART',
        id: item,
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
        id: item
    }
};

export const setActiveCategory = (id) => {
    return {
        type: 'SET_ACTIVE_CATEGORY',
        id: id
    }
};

export const openModal = (item) => {
    return {
        type: 'SET_ACTIVE_ITEM',
        item: item
    }
};

export const toggleIngredient = (id) => {
    "use strict";
    return {
        type: 'TOGGLE_INGREDIENT',
        id: id
    }
};
