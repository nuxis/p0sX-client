import { createSelector } from 'reselect'

export const getCategories = (state) => state.categories

export const getSelectedCategory = (state) => state.selectedCategory

export const getCurrentItem = (state) => state.currentItem

export const getCart = (state) => state.cart

export const getTotalPriceOfCart = createSelector(
    [getCart],
    (cart) => {
        return cart.reduce((accumulator, entry) => {
            accumulator += entry.item.get('price')
            accumulator += entry.ingredients.reduce((accumulator, ingredient) => {
                return accumulator + parseInt(ingredient.get('price'))
            }, 0)
            return accumulator
        }, 0)
    }
)

export const getIngredients = (state) => state.ingredients

export const getItems = (state) => state.items

export const getItemsByCategory = createSelector(
    [getItems, getSelectedCategory],
    (items, categoryId) => {
        if (categoryId === 0) {
            return items
        } else {
            return items.filter((item) => item.get('category') === categoryId)
        }
    }
)
