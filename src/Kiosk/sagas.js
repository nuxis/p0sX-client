import { call, put, take, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import * as api from '../common/api'
import * as actions from './actions'
import { close as closePaymentModal } from './components/PaymentModal'
import * as selectors from './selectors'

export function * watchKioskData () {
    while (true) {
        yield take(actions.GET_ALL_KIOSK_DATA)
        yield [
            call(getItems),
            call(getCategories),
            call(getDiscounts)
        ]
    }
}

export function * watchItems () {
    while (true) {
        yield take(actions.GET_ITEMS)
        yield call(getItems)
    }
}

function * getItems () {
    try {
        const items = yield call(api.getItems)
        yield put(actions.setItems(items))
    } catch (error) {
        console.error(error)
    }
}

export function * watchCategories () {
    while (true) {
        yield take(actions.GET_CATEGORIES)
        yield call(getCategories)
    }
}

function * getCategories () {
    try {
        const categories = yield call(api.getCategories)
        yield put(actions.setCategories(categories))
    } catch (error) {
        console.error(error)
    }
}

export function * watchDiscounts () {
    while (true) {
        yield take(actions.GET_DISCOUNTS)
        yield call(getDiscounts)
    }
}

function * getDiscounts () {
    try {
        const discounts = yield call(api.getDiscounts)
        yield put(actions.setDiscounts(discounts))
    } catch (error) {
        console.error(error)
    }
}

function * postPurchase (action) {
    try {
        const result = yield call(api.postPurchase, action.options)
        console.log(result)
        if (result.status === 200) {
            closePaymentModal()
            yield put(actions.emptyCart())
            yield put(actions.setPaymentState('select'))
        } else {
            // TODO: Show error message of some sort.
        }
    } catch (error) {
        console.error(error)
    }
}

export function * watchPostPurchase () {
    yield * takeEvery(actions.POST_PURCHASE, postPurchase)
}

function * applyDiscounts (action) {
    var discounts = yield select(selectors.getDiscounts, action.payment_method)
    var items = yield select(selectors.getItems)
    discounts = discounts.map(d => d.set('item', items.find(i => i.get('id') === d.get('item'))))
    discounts = discounts.sortBy(d => d.get('item').get('price'))
    var cart = yield select(selectors.getCart)
    for (const discount of discounts) {
        // eslint-disable-next-line no-eval
        const evalFunc = eval(discount.get('expression'))
        const result = evalFunc(cart)
        result.cart.forEach(item => {
            var index = cart.indexOf(item)
            cart = cart.remove(index)
        })
        for (var i = 0; i < result.count; i++) {
            yield put(actions.addItemToCart(discount.get('item')))
        }
    }
}

export function * watchApplyDiscounts () {
    yield * takeEvery('APPLY_DISCOUNTS', applyDiscounts)
}
