function action (type, payload = {}) {
    return { type, ...payload }
}

// Action definitions
export const SET_OPEN_ORDERS = 'SET_OPEN_ORDERS'
export const SET_DONE_ORDERS = 'SET_DONE_ORDERS'
export const SET_ARCHIVED_ORDERS = 'SET_ARCHIVED_ORDERS'

// Action creators
export const setOpenOrders = (orders) => action(SET_OPEN_ORDERS, { orders })
export const setDoneOrders = (orders) => action(SET_DONE_ORDERS, { orders })
export const setArchivedOrders = (orders) => action(SET_ARCHIVED_ORDERS, { orders })
