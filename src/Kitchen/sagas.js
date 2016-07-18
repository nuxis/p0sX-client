import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as api from '../common/api'
import * as actions from './actions'
import settings from '../common/settings'

const DELAY = parseInt(settings.get('customer_order_delay')) || 5

export function * loopGetOrders () {
    while (true) {
        console.log('DELAY :', DELAY)
        yield delay(DELAY * 5000)
        yield call(getOrders)
    }
}

function * getOrders () {
    try {
        const orders = yield call(api.getOrders)
        yield put(actions.setOrders(orders))
    } catch (error) {
        console.error(error)
    }
}
