import { Map, List } from 'immutable'
import * as actions from './actions'

const orderInit = Map({
    open: List(),
    done: List(),
    archived: List()
})

export function orders (state = orderInit, action) {
    console.log('order state: ', state, action)
    switch (action.type) {
    case actions.SET_OPEN_ORDERS:
        return state.set('open', action.orders)
    case actions.SET_DONE_ORDERS:
        return state.set('done', action.orders)
    case actions.SET_ARCHIVED_ORDERS:
        return state.set('archived', action.orders)
    default:
        return state
    }
}
