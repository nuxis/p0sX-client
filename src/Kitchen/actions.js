function action (type, payload = {}) {
    return { type, ...payload }
}

// Action definitions
export const SET_ORDERS = 'SET_ORDERS'

// Action creators
export const setOrders = (orders) => action(SET_ORDERS, { orders })
