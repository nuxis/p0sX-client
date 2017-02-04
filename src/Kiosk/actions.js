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
export const EDIT_CART_ITEM = 'EDIT_CART_ITEM'

export const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY'

export const OPEN_INGREDIENT_MODAL_FOR_ITEM = 'OPEN_INGREDIENT_MODAL_FOR_ITEM'
export const TOGGLE_INGREDIENT_MODAL = 'TOGGLE_INGREDIENT_MODAL'
export const TOGGLE_INGREDIENT = 'TOGGLE_INGREDIENT'

export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'

export const SET_PAYMENT_STATE = 'SET_PAYMENT_STATE'
export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD'
export const SET_PAYMENT_MODAL_OPEN = 'SET_PAYMENT_MODAL_OPEN'

export const POST_PURCHASE = 'POST_PURCHASE'

export const APPLY_DISCOUNTS = 'APPLY_DISCOUNTS'
export const GET_DISCOUNTS = 'GET_DISCOUNTS'
export const SET_DISCOUNTS = 'SET_DISCOUNTS'
export const REMOVE_DISCOUNTS = 'REMOVE_DISCOUNTS'

export const SET_LAST_ORDER_MODAL_OPEN = 'SET_LAST_ORDER_MODAL_OPEN'
export const SET_LAST_ORDER = 'SET_LAST_ORDER'
export const CLEAR_LAST_ORDER = 'CLEAR_LAST_ORDER'
export const UNDO_ORDER = 'UNDO_ORDER'

export const SET_LAST_CART = 'SET_LAST_CART'

export const GET_CREDIT_FOR_CREW = 'GET_CREDIT_FOR_CREW'
export const SET_CREDIT = 'SET_CREDIT'
export const SET_CREDIT_MODAL_OPEN = 'SET_CREDIT_MODAL_OPEN'

export const CASHIER_LOGIN = 'CASHIER_LOGIN'
export const CASHIER_LOGOUT = 'CASHIER_LOGOUT'
export const CASHIER_SUCCESS = 'CASHIER_SUCCESS'
export const CASHIER_CLEAR = 'CASHIER_CLEAR'
export const SET_LOCK_MODAL_OPEN = 'SET_LOCK_MODAL_OPEN'

export const OPEN_AND_GET_CURRENT_SHIFT = 'OPEN_AND_GET_CURRENT_SHIFT'
export const SET_CURRENT_SHIFT = 'SET_CURRENT_SHIFT'
export const CREATE_NEW_SHIFT = 'CREATE_NEW_SHIFT'
export const SET_SHIFT_MODAL_OPEN = 'SET_SHIFT_MODAL_OPEN'

export const SET_PURCHASE_IN_PROGRESS = 'SET_PURCHASE_IN_PROGRESS'

export const TOGGLE_SETTINGS_MODAL = 'TOGGLE_SETTINGS_MODAL'
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'

export const DISPLAY_NOTIFICATION = 'DISPLAY_NOTIFICATION'
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

// Action creators
export const toggleSettingsModal = () => action(TOGGLE_SETTINGS_MODAL, {})
export const updateSettings = (settings) => action(UPDATE_SETTINGS, {settings})

export const addCurrentItemToCart = (currentItem, message) => action(ADD_CURRENT_ITEM_TO_CART, { currentItem, message })

export const addItemToCart = (item) => action(ADD_ITEM_TO_CART, { item })
export const editCartItem = (itemIndex) => action(EDIT_CART_ITEM, {itemIndex})

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

export const openIngredientModalForItem = (item, ingredients, message, edit) => action(OPEN_INGREDIENT_MODAL_FOR_ITEM, { item, ingredients, message, edit })
export const toggleIngredientModal = () => action(TOGGLE_INGREDIENT_MODAL, {})
export const toggleIngredient = (ingredient) => action(TOGGLE_INGREDIENT, { ingredient })

export const setSearchString = (value) => action(SET_SEARCH_VALUE, { value })

export const setPaymentState = (state) => action(SET_PAYMENT_STATE, { state })
export const setPaymentMethod = (method) => action(SET_PAYMENT_METHOD, { method })
export const setPaymentModalOpen = (open) => action(SET_PAYMENT_MODAL_OPEN, { open })

export const postPurchase = (options) => action(POST_PURCHASE, {options})

export const applyDiscounts = (paymentMethod) => action(APPLY_DISCOUNTS, {paymentMethod})

export const removeDiscounts = () => action(REMOVE_DISCOUNTS, {})

export const setLastOrder = (cart) => action(SET_LAST_ORDER, {cart})
export const setLastOrderModalOpen = (open) => action(SET_LAST_ORDER_MODAL_OPEN, {open})
export const clearLastOrder = () => action(CLEAR_LAST_ORDER, {})

export const undoOrder = () => action(UNDO_ORDER, {})

export const getCreditForCrew = (badge) => action(GET_CREDIT_FOR_CREW, {badge})
export const setCredit = (credit) => action(SET_CREDIT, {credit})
export const setCreditModalOpen = (open) => action(SET_CREDIT_MODAL_OPEN, {open})

export const cashierLogin = (card) => action(CASHIER_LOGIN, { card })
export const cashierLogout = () => action(CASHIER_LOGOUT, {})
export const cashierSuccess = (crew) => action(CASHIER_SUCCESS, { crew })
export const cashierClear = () => action(CASHIER_CLEAR, {})
export const setLockModalOpen = (open) => action(SET_LOCK_MODAL_OPEN, {open})

export const openAndGetCurrentShift = () => action(OPEN_AND_GET_CURRENT_SHIFT, {})
export const setCurrentShift = (shift) => action(SET_CURRENT_SHIFT, { shift })
export const createNewShift = (card) => action(CREATE_NEW_SHIFT, { card })
export const setShiftModalOpen = (open) => action(SET_SHIFT_MODAL_OPEN, {open})

export const setLastCart = (cart) => action(SET_LAST_CART, { cart })

export const setPurchaseInProgress = (value) => action(SET_PURCHASE_IN_PROGRESS, {value})

export const displayNotification = (message, timeout = 3000) => action(DISPLAY_NOTIFICATION, {message, timeout})
export const hideNotification = () => action(HIDE_NOTIFICATION, {})
