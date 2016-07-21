// DIS FILE IS GOING AWAY, INIT SHOULD BE SAGA

import axios from 'axios'
import { getCategories, getIngredients, getItems } from './common/api'

const setInitialData = () => {
    return (dispatch) => {
        console.log('Calls for apiz')
        axios.all([
            getCategories(),
            getIngredients(),
            getItems()
        ])
        .then(axios.spread((categories, ingredients, items) => {
            dispatch(addCategories(categories.data))
            dispatch(setIngredients(ingredients.data))
            dispatch(setItems(items.data))
        }))
    }
}

const addCurrentItemToCart = () => {
    return {
        type: 'ADD_CURRENT_TO_CART'
    }
}

const addToCart = (item, ingredients = []) => {
    return {
        type: 'ADD_TO_CART',
        id: item,
        ingredients: ingredients
    }
}

const setItems = (items) => {
    return {
        type: 'SET_ITEMS',
        items: items
    }
}

const setIngredients = (ingredients) => {
    return {
        type: 'SET_INGREDIENTS',
        ingredients: ingredients
    }
}

const addCategories = (categories) => {
    return {
        type: 'ADD_CATEGORIES',
        categories: categories
    }
}

const emptyCart = () => {
    return {
        type: 'EMPTY_CART'
    }
}

const removeItem = (item) => {
    return {
        type: 'REMOVE_ITEM',
        id: item
    }
}

const setActiveCategory = (id) => {
    return {
        type: 'SET_ACTIVE_CATEGORY',
        id: id
    }
}

const openModal = (item) => {
    return {
        type: 'SET_ACTIVE_ITEM',
        item: item
    }
}

const toggleIngredient = (id) => {
    return {
        type: 'TOGGLE_INGREDIENT',
        id: id
    }
}

export {
    setInitialData,
    addCurrentItemToCart,
    addToCart,
    setItems,
    setIngredients,
    addCategories,
    emptyCart,
    removeItem,
    setActiveCategory,
    openModal,
    toggleIngredient
}
