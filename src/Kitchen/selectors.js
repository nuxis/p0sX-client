import { createSelector } from 'reselect'
import { ORDER_STATE } from '../common/api'

export const getOrders = (state) => state.orders

export const getOpenOrders = createSelector(
    [getOrders],
    (orders) => {
        return orders.get('open')
    }
)

export const getDoneOrders = createSelector(
    [getOrders],
    (orders) => {
        return orders.get('done')
    }
)

export const getArchivedOrders = createSelector(
    [getOrders],
    (orders) => {
        return orders.get('archived')
    }
)
