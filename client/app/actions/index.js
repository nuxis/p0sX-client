import axios from 'axios'
import { get_categories, get_ingredients, get_items } from './../backend'

export const setInitialData = () => {
    return (dispatch) => {
        axios.all([
            get_categories(),
            get_ingredients(),
            get_items()
        ])
        .then(axios.spread((categories, ingredients, items) => {
            dispatch(addCategories(categories.data))
            dispatch(setIngredients(ingredients.data))
            dispatch(setItems(items.data))
        }))
    }
}

export const addCurrentItemToCart = () => {
    return {
        type: 'ADD_CURRENT_TO_CART'
    }
}

export const addToCart = (item, ingredients = []) => {
    return {
        type: 'ADD_TO_CART',
        id: item,
        ingredients: ingredients
    }
}

export const setItems = (items) => {
    return {
        type: 'SET_ITEMS',
        items: items
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: 'SET_INGREDIENTS',
        ingredients: ingredients
    }
}

export const addCategories = (categories) => {
    return {
        type: 'ADD_CATEGORIES',
        categories: categories
    }
}

export const emptyCart = () => {
    return {
        type: 'EMPTY_CART'
    }
}

export const removeItem = (item) => {
    return {
        type: 'REMOVE_ITEM',
        id: item
    }
}

export const setActiveCategory = (id) => {
    return {
        type: 'SET_ACTIVE_CATEGORY',
        id: id
    }
}

export const openModal = (item) => {
    return {
        type: 'SET_ACTIVE_ITEM',
        item: item
    }
}

export const toggleIngredient = (id) => {
    return {
        type: 'TOGGLE_INGREDIENT',
        id: id
    }
}
