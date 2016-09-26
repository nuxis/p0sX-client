function action (type, payload = {}) {
    return { type, ...payload }
}

// Action definitions
export const ADD_CURRENT_ITEM_TO_CART = 'ADD_CURRENT_ITEM_TO_CART'

export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'

export const GET_ALL_KIOSK_DATA = 'GET_ALL_KIOSK_DATA'

export const GET_ITEMS = 'GET_ITEMS'
export const SET_ITEMS = 'SET_ITEMS'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SET_CATEGORIES = 'SET_CATEGORIES'

export const EMPTY_CART = 'EMPTY_CART'

export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'

export const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY'

export const OPEN_INGREDIENT_MODAL_FOR_ITEM = 'OPEN_INGREDIENT_MODAL_FOR_ITEM'

export const TOGGLE_INGREDIENT = 'TOGGLE_INGREDIENT'

export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'

export const SET_PAYMENT_STATE = 'SET_PAYMENT_STATE'

export const POST_PURCHASE = 'POST_PURCHASE'

export const APPLY_DISCOUNTS = 'APPLY_DISCOUNTS'
export const GET_DISCOUNTS = 'GET_DISCOUNTS'
export const SET_DISCOUNTS = 'SET_DISCOUNTS'
export const REMOVE_DISCOUNTS = 'REMOVE_DISCOUNTS'

// Action creators
export const addCurrentItemToCart = (currentItem) => action(ADD_CURRENT_ITEM_TO_CART, { currentItem })

export const addItemToCart = (item) => action(ADD_ITEM_TO_CART, { item })

export const getAllKioskData = () => action(GET_ALL_KIOSK_DATA, {})

export const getItems = () => action(GET_ITEMS, {})
export const setItems = (items) => action(SET_ITEMS, { items })

export const getCategories = () => action(GET_CATEGORIES, {})
export const setCategories = (categories) => action(SET_CATEGORIES, { categories })

export const getDiscounts = () => action(GET_DISCOUNTS, {})
export const setDiscounts = (discounts) => action(SET_DISCOUNTS, { discounts })

export const emptyCart = () => action(EMPTY_CART, {})

export const removeItemFromCart = (itemIndexInCart) => action(REMOVE_ITEM_FROM_CART, { itemIndexInCart })

export const setActiveCategory = (category) => action(SET_ACTIVE_CATEGORY, { category })

export const openIngredientModalForItem = (item) => action(OPEN_INGREDIENT_MODAL_FOR_ITEM, { item })

export const toggleIngredient = (ingredient) => action(TOGGLE_INGREDIENT, { ingredient })

export const setSearchString = (value) => action(SET_SEARCH_VALUE, { value })

export const setPaymentState = (state) => action(SET_PAYMENT_STATE, { state })

export const postPurchase = (options) => action(POST_PURCHASE, {options})

export const applyDiscounts = (paymentMethod) => action(APPLY_DISCOUNTS, {paymentMethod})

export const removeDiscounts = () => action(REMOVE_DISCOUNTS, {})
