import { createSelector } from 'reselect'

export const getCategories = (state) => state.categories

export const getSelectedCategory = (state) => state.selectedCategory

export const getCurrentItem = (state) => state.currentItem

export const getCart = (state) => state.cart

// This method should possibly be renamed and used when
// when retrieveing the cart for checkout?
export const getRenderedCart = createSelector(
    [getCart],
    (cart) => {
        return cart.map((entry) => {
            const item = entry.get('item')
            const priceWithIngredients = entry.get('ingredients').reduce((total, ingredient) => {
                return total + parseInt(ingredient.get('price'))
            }, item.get('price'))
            return entry.set('item', item.set('price', priceWithIngredients))
        })
    }
)

export const getTotalPriceOfCart = createSelector(
    [getCart],
    (cart) => {
        return cart.reduce((accumulator, entry) => {
            console.log('getpriceselector: ', entry)
            accumulator += entry.get('item').get('price')
            accumulator += entry.get('ingredients').reduce((accumulator, ingredient) => {
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
        console.log('getItemsByCategory: ', items, categoryId)
        if (categoryId === 0) {
            return items
        } else {
            return items.filter((item) => item.get('category') === categoryId)
        }
    }
)
