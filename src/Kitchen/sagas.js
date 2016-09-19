import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as api from '../common/api'
import * as actions from './actions'
import settings from '../common/settings'

const DELAY = parseInt(settings.get('customer_order_delay')) || 10

export function * loopGetOrders () {
    while (true) {
        console.log('DELAY :', DELAY)
        yield delay(DELAY * 1000)
        yield call(getOpenOrders)
        yield call(getDoneOrders)
    }
}

function * getOpenOrders () {
    try {
        const orders = yield call(api.getOrders, api.ORDER_STATE.OPEN)
        yield put(actions.setOpenOrders(orders))
    } catch (error) {
        console.error(error)
    }
}

function * getDoneOrders () {
    try {
        const orders = yield call(api.getOrders, api.ORDER_STATE.DONE)
        yield put(actions.setDoneOrders(orders))
    } catch (error) {
        console.error(error)
    }
}

function * getArchivedOrders () {
    try {
        const orders = yield call(api.getOrders, api.ORDER_STATE.ARCHIVED)
        yield put(actions.setArchivedOrders(orders))
    } catch (error) {
        console.error(error)
    }
}