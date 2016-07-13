import { createSelector } from 'reselect'

export const getCategories = (state) => state.categories

export const getSelectedCategory = (state) => state.selectedCategory

export const getCurrentItem = (state) => state.currentItem

export const getCart = (state) => state.cart

export const getIngredients = (state) => state.ingredients

export const getItems = (state) => state.items
