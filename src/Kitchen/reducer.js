import { List } from 'immutable'
import * as actions from './actions'

const orderInit = List()

export function orders (state = orderInit, action) {
    console.log('order state: ', state, action)
    switch (action.type) {
    case actions.SET_ORDERS:
        return action.orders
    default:
        return state
    }
}
