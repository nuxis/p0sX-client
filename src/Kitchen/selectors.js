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

export const getInProgressOrders = createSelector(
    [getOrders],
    (orders) => {
        return orders.filter((order) => {
            return order.get('state') === ORDER_STATE.IN_PROGRESS
        })
    }
)

export const getDeliveredOrders = createSelector(
    [getOrders],
    (orders) => {
        return orders.filter((order) => {
            return order.get('state') === ORDER_STATE.DELIVERED
        })
    }
)
