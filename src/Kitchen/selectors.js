import { createSelector } from 'reselect'
import { ORDER_STATE } from '../common/api'

export const getOrders = (state) => state.orders

export const getOpenOrders = createSelector(
    [getOrders],
    (orders) => {
        return orders.filter((order) => {
            return order.get('state') === ORDER_STATE.OPEN
        })
    }
)

export const getDoneOrders = createSelector(
    [getOrders],
    (orders) => {
        return orders.filter((order) => {
            return order.get('state') === ORDER_STATE.DONE
        })
    }
)

export const getArchivedOrders = createSelector(
    [getOrders],
    (orders) => {
        return orders.filter((order) => {
            return order.get('state') === ORDER_STATE.ARCHIVED
        })
    }
)
