import { call, put, take, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import * as api from '../common/api'
import * as actions from './actions'
import { close as closePaymentModal } from './components/PaymentModal'
import * as selectors from './selectors'
import { NotificationManager } from 'react-notifications'

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
        const cart = yield select(selectors.getCart)
        const options = {
            ...action.options,
            lines: cart.map(entry => {
                return {
                    item: entry.get('item').get('id'),
                    ingredients: entry.get('ingredients').map(ingredient => ingredient.get('id'))
                }
            })
        }

        if (options.total < 0) {
            NotificationManager.error('The cart has a negative total sum', '', 5000)
            closePaymentModal()
            yield put(actions.setPaymentState(api.PAYMENT_METHOD.SELECT))
            return
        }

        if (options.payment_method === api.PAYMENT_METHOD.CREW) {
            const credit = yield call(api.getCreditForCrew, options.card)
            if (credit && options.total > credit.get('left')) {
                NotificationManager.error('Not enough credit left on card', '', 5000)
                closePaymentModal()
                yield put(actions.setPaymentState(api.PAYMENT_METHOD.SELECT))
                return
            }
        }

        const result = yield call(api.postPurchase, options)
        if (result) {
            yield put(actions.setLastOrder(result))
            if (options.payment_method === api.PAYMENT_METHOD.CASH) {
                NotificationManager.success(`Give ${options.amountReceived - options.total} Kr. back`, 'Purchase complete', 5000)
            } else {
                NotificationManager.success('Purchase complete', '', 5000)
            }
            closePaymentModal()
            yield put(actions.emptyCart())
            yield put(actions.setPaymentState(api.PAYMENT_METHOD.SELECT))
        }
    } catch (error) {
        console.error(error)
    }
}

function * undoOrder () {
    try {
        const lastOrder = yield select(selectors.getLastOrder)
        if (lastOrder.get('lines').isEmpty()) {
            NotificationManager.error('There is nothing to undo', '', 5000)
        } else {
            const options = {
                ...lastOrder,
                payment_method: api.PAYMENT_METHOD.UNDO
            }
            const result = yield call(api.postPurchase, options)
            if (result) {
                NotificationManager.success('The last purchase has been undone', '', 5000)
                yield put(actions.clearLastOrder())
            }
        }
    } catch (error) {
        console.error(error)
    }
}

export function * watchPostPurchase () {
    yield * takeEvery(actions.POST_PURCHASE, postPurchase)
}

function * applyDiscounts (action) {
    var discounts = yield select(selectors.getDiscounts, action.paymentMethod)
    var items = yield select(selectors.getItems)
    discounts = discounts.map(d => d.set('item', items.find(i => i.get('id') === d.get('item'))))
    discounts = discounts.sortBy(d => d.get('item').get('price'))
    var cart = yield select(selectors.getCart)

    for (const discount of discounts) {
        // eslint-disable-next-line no-eval
        const evalFunc = eval(discount.get('expression'))
        const result = evalFunc(cart)
        result.used.forEach(item => {
            var index = cart.indexOf(item)
            cart = cart.remove(index)
        })
        for (var i = 0; i < result.count; i++) {
            yield put(actions.addItemToCart(discount.get('item')))
        }
    }
}

function * getCreditForCrew (badge) {
    const result = yield call(api.getCreditForCrew, badge.badge)
    if (result) {
        yield put(actions.setCredit(result))
    }
}

export function * watchApplyDiscounts () {
    yield * takeEvery(actions.APPLY_DISCOUNTS, applyDiscounts)
}

export function * watchUndoOrders () {
    yield * takeEvery(actions.UNDO_ORDER, undoOrder)
}

export function * watchGetCreditForCrew () {
    yield * takeEvery(actions.GET_CREDIT_FOR_CREW, getCreditForCrew)
}
