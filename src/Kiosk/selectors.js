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
        if (search.length > 0) {
            return items.filter(item => item.get('name').toLowerCase().indexOf(search.toLowerCase()) !== -1 || item.get('barcode') === search)
        } else if (categoryId > 0) {
            return items.filter(item => item.get('category') === categoryId)
        } else {
            return items
        }
    }
)

export const getDiscounts = (state, paymentMethod) => state.discounts.filter(d => d.get('payment_method') === paymentMethod)

export const getItemById = (state, id) => state.items.find(item => item.get('id') === id)

export const getLastOrder = (state) => state.lastOrder
