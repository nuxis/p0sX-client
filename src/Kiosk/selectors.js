import { createSelector } from 'reselect'

export const getCategories = (state) => state.categories

export const getSelectedCategory = (state) => state.selectedCategory

export const getCurrentItem = (state) => state.currentItem

export const getCart = (state) => state.cart

export const getSearch = (state) => state.search

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
    [getItems, getSelectedCategory, getSearch],
    (items, categoryId, search) => {
        var shownItems;
        if (categoryId === 0) {
            shownItems = items
        } else {
            shownItems = items.filter((item) => item.get('category') === categoryId)
        }
        if(search.length > 0)
        {
            shownItems = shownItems.filter(item => item.get('name').toLowerCase().indexOf(search.toLowerCase()) != -1 || item.get('barcode') === search)
        }

        return shownItems
    }
)
