import { call, put, take, select, spawn } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import * as api from '../common/api'
import * as actions from './actions'
import { close as closePaymentModal } from './components/PaymentModal'
import * as selectors from './selectors'
import { NotificationManager } from 'react-notifications'
import { close as closeLockModal, open as openLockModal } from './components/LockModal'
import { open as openShiftModal } from './components/ShiftModal'
import receipt, { cashDraw } from '../common/receipt'
import kitchenPrinter from '../common/kitchen'
import settings from '../common/settings'

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
        const purchaseInProgress = yield select(selectors.getPurchaseInProgress)
        if (purchaseInProgress) {
            return
        }
        yield put(actions.setPurchaseInProgress(true))
        const cart = yield select(selectors.getCart)
        const options = {
            ...action.options,
            undo: false,
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
            yield put(actions.setPurchaseInProgress(false))
            return
        }

        if (options.payment_method === api.PAYMENT_METHOD.CREW) {
            const credit = yield call(api.getCreditForCrew, options.card)
            if (!credit) {
                yield put(actions.setPurchaseInProgress(false))
                return
            } else if (options.total > credit.get('left')) {
                NotificationManager.error('Not enough credit left on card', '', 5000)
                closePaymentModal()
                yield put(actions.setPaymentState(api.PAYMENT_METHOD.SELECT))
                yield put(actions.setPurchaseInProgress(false))
                return
            }
        }

        const result = yield call(api.postPurchase, options)
        if (result) {
            yield put(actions.setLastOrder(result))
            yield put(actions.setLastCart(cart))
            if (options.payment_method === api.PAYMENT_METHOD.CASH) {
                NotificationManager.success(`Give ${options.amountReceived - options.total},- back`, 'Purchase complete', 9999999999999999)
            } else {
                NotificationManager.success('Purchase complete', '', 9999999999999999)
            }

            var items = cart.filter(entry => entry.get('item').get('created_in_the_kitchen'))
            const receiptConfig = settings.get('receiptPrinter')
            if (items.size > 0) {
                var receiptItems = yield select(selectors.getRenderedCart)
                const total = yield select(selectors.getTotalPriceOfCart)
                receiptItems = receiptItems.map(entry => {
                    return {
                        name: entry.get('item').get('name'),
                        price: entry.get('item').get('price')
                    }
                }).toJS()

                receipt(receiptConfig.type, receiptConfig.config, receiptItems, result.get('id'), total, options.payment_method === api.PAYMENT_METHOD.CASH)

                items = items.map(entry => {
                    return {
                        name: entry.get('item').get('name'),
                        ingredients: entry.get('ingredients').toJS(),
                        message: entry.get('message')
                    }
                }).toJS()

                console.log(items)
                const kitchenConfig = settings.get('kitchenPrinter')

                for (const entry of items) {
                    //kitchenPrinter(kitchenConfig.type, kitchenConfig.config, entry, result.get('id'))
                    console.log('send to kitchen')
                    kitchenPrinter(kitchenConfig.type, kitchenConfig.config, entry, result.get('id'))
                }
            } else if (options.payment_method === api.PAYMENT_METHOD.CASH) {
                cashDraw(receiptConfig.type, receiptConfig.config)
            }
            closePaymentModal()
            yield put(actions.emptyCart())
            yield put(actions.setPaymentState(api.PAYMENT_METHOD.SELECT))
            yield put(actions.setPurchaseInProgress(false))
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
            var options = lastOrder.toJS()
            options = {
                ...options,
                undo: true,
                lines: options.lines.map(line => {
                    return {
                        item: line.item.id,
                        ingredients: line.ingredients.map(i => i.id)
                    }
                })
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

function * cashierLogin (action) {
    try {
        const crew = yield call(api.getCrew, action.card)
        if (crew.size === 1) {
            closeLockModal()
            yield put(actions.cashierSuccess(crew.get(0)))
        } else {
            NotificationManager.error('Login failed', 'Are you crew?!', 5000)
            yield put(actions.cashierClear())
        }
    } catch (error) {
        console.error(error)
    }
}

export function * watchCashierLogin () {
    yield * takeEvery(actions.CASHIER_LOGIN, cashierLogin)
}

function * cashierLogout () {
    try {
        openLockModal()
        NotificationManager.success('Logout successful', 'You are now logged out of the system', 5000)
        yield put(actions.cashierClear())
    } catch (error) {
        console.error(error)
    }
}

export function * watchCashierLogout () {
    yield * takeEvery(actions.CASHIER_LOGOUT, cashierLogout)
}

function * openAndGetCurrentShift () {
    try {
        const currentShifts = yield call(api.getCurrentShift)
        if (currentShifts.size === 1) {
            const shift = currentShifts.get(0)
            openShiftModal()
            yield put(actions.setCurrentShift(shift))
        } else if (currentShifts.size === 0) {
            const card = yield select(selectors.getLoggedInCashier)
            yield put(actions.createNewShift(card))
        } else {
            NotificationManager.error('Retrieving the current shift failed, contact Tech crew', 'Getting shift failed', 5000)
        }
    } catch (error) {
        console.error(error)
    }
}

export function * watchOpenAndGetCurrentShift () {
    yield * takeEvery(actions.OPEN_AND_GET_CURRENT_SHIFT, openAndGetCurrentShift)
}

function * createNewShift (action) {
    try {
        const create = yield call(api.createShift, action.card)
        if (create) {
            NotificationManager.success('New shift successfully created!', '', 5000)
            yield put(actions.openAndGetCurrentShift())
        }
    } catch (error) {
        console.error(error)
    }
}

export function * watchCreateNewShift () {
    yield * takeEvery(actions.CREATE_NEW_SHIFT, createNewShift)
}
