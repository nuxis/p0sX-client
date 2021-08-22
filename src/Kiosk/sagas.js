import { call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import * as api from '../common/api'
import * as actions from './actions'
import * as selectors from './selectors'
import { NotificationManager } from 'react-notifications'
// import { cashDraw, kitchenReceipt, customerOrderReceipt, printShift } from '../common/print'
import settings from '../common/settings'

export function * watchKioskData () {
    yield * takeEvery(actions.GET_ALL_KIOSK_DATA, function * () {
        yield [
            call(getItems),
            call(getCategories),
            call(getDiscounts)
        ]
    })
}

export function * watchItems () {
    yield * takeEvery(actions.GET_ITEMS, getItems)
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
    yield * takeEvery(actions.GET_CATEGORIES, getCategories)
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
    yield * takeEvery(actions.GET_DISCOUNTS, getDiscounts)
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
                    item: entry.item.id,
                    ingredients: entry.ingredients.map(ingredient => ingredient.id)
                }
            })
        }

        if (options.total < 0) {
            NotificationManager.error('The cart has a negative total sum', '', 5000)
            yield put(actions.setPaymentModalOpen(false))
            yield put(actions.setPaymentState(1))
            yield put(actions.setPurchaseInProgress(false))
            yield put(actions.removeDiscounts())
            return
        }

        if (options.payment_method === api.PAYMENT_METHOD.CREDIT) {
            const credit = yield call(api.getCreditForCrew, options.card)
            if (!credit) {
                yield put(actions.setPurchaseInProgress(false))
                return
            } else if (options.total > credit.left) {
                NotificationManager.error('Not enough credit left on card', '', 5000)
                yield put(actions.setPaymentModalOpen(false))
                yield put(actions.setPaymentState(1))
                yield put(actions.setPurchaseInProgress(false))
                yield put(actions.removeDiscounts())
                return
            }
        }

        const result = yield call(api.postPurchase, options)
        if (result) {
            yield put(actions.setLastOrder(result))
            yield put(actions.setLastCart(cart))

            var receiptItems = yield select(selectors.getRenderedCart)
            const receiptConfig = settings.get('receiptPrinter')
            const kitchenConfigs = settings.get('kitchenPrinters')

            receiptItems = receiptItems.filter(entry => entry.item.created_in_the_kitchen)
            if (receiptItems.length > 0) {
                const compare = (a, b) => {
                    if (a.name < b.name) {
                        return -1
                    }
                    if (a.name > b.name) {
                        return 1
                    }
                    return 0
                }

                receiptItems = receiptItems.map(entry => {
                    return {
                        name: entry.item.name,
                        ingredients: entry.ingredients.sort(compare),
                        price: entry.item.price,
                        message: entry.message
                    }
                })

                // Print receipt for the customer
                console.log('customerOrderReceipt')
                // customerOrderReceipt(receiptConfig.type, receiptConfig.config, receiptItems, result.id, options.payment_method === api.PAYMENT_METHOD.CASH).then(() => {})

                // Print separate notes for the kitchen
                for (const entry of receiptItems) {
                    for (const kitchenConfig of kitchenConfigs) {
                        console.log('kitchenReceipt')
                        // kitchenReceipt(kitchenConfig.type, kitchenConfig.config, entry, result.id).then(() => {})
                    }
                }
            } else if (options.payment_method === api.PAYMENT_METHOD.CASH) {
                console.log('cashDraw')
                // cashDraw(receiptConfig.type, receiptConfig.config).then(() => {})
            }
            yield put(actions.emptyCart())
            yield put(actions.setPaymentState(2))
        }
        yield put(actions.setPurchaseInProgress(false))
        yield put(actions.removeDiscounts())
    } catch (error) {
        yield put(actions.setPaymentModalOpen(false))
        yield put(actions.setPaymentState(1))
        yield put(actions.setPurchaseInProgress(false))
        yield put(actions.removeDiscounts())
        console.error(error)
    }
}

function * undoOrder () {
    try {
        const lastOrder = yield select(selectors.getLastOrder)
        console.log(lastOrder.lines)
        if (lastOrder.lines.length === 0) {
            NotificationManager.error('There is nothing to undo', '', 5000)
        } else {
            var options = lastOrder
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
    discounts = discounts.map(d => Object.assign({}, d, {
        item: items.find(i => i.id === d.item)
    })).sort(d => d.item.price)
    var cart = yield select(selectors.getCart)

    for (const discount of discounts) {
        // eslint-disable-next-line no-eval
        const evalFunc = eval(discount.expression)
        const result = evalFunc(cart)
        result.used.forEach(item => {
            var index = cart.indexOf(item)
            cart = [
                ...cart.slice(0, index),
                ...cart.slice(index + 1)
            ]
        })
        for (var i = 0; i < result.count; i++) {
            yield put(actions.addItemToCart(discount.item))
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
        const user = yield call(api.getUser, action.card)
        if (user.length === 1 && user[0].is_cashier) {
            yield put(actions.cashierSuccess(user[0]))
        } else {
            NotificationManager.error('Make sure you have access to be a cashier!', 'Login failed', 5000)
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
        NotificationManager.success('You are now logged out of the system', 'Logout successful', 5000)
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
        if (currentShifts.length === 1) {
            const shift = currentShifts[0]
            yield put(actions.setShiftModalOpen(true))
            yield put(actions.setCurrentShift(shift))
        } else if (currentShifts.length === 0) {
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
            const shift = yield select(selectors.getShift)
            const settings = yield select(selectors.getSettings)
            const receiptConfig = settings.receiptPrinter
            const name = settings.name

            console.log('printShift')
            // yield printShift(receiptConfig.type, receiptConfig.config, shift, name)

            yield put(actions.openAndGetCurrentShift())
        }
    } catch (error) {
        NotificationManager.error('Error when printing shift info', '', 5000)
        console.error(error)
    }
}

export function * watchCreateNewShift () {
    yield * takeEvery(actions.CREATE_NEW_SHIFT, createNewShift)
}

function * editCartItem (action) {
    const item = yield select(selectors.getCartItemByIndex, action.itemIndex)
    if (item.item.created_in_the_kitchen) {
        yield put(actions.openIngredientModalForItem(item.item, item.ingredients, item.message, true))
        yield put(actions.removeItemFromCart(action.itemIndex))
    }
}

export function * watchEditCartItem () {
    yield * takeEvery(actions.EDIT_CART_ITEM, editCartItem)
}
