import { fork } from 'redux-saga/effects'
import { watchKioskData, watchItems, watchCategories, watchPostPurchase, watchApplyDiscounts, watchDiscounts,
    watchUndoOrders, watchGetCreditForCrew, watchCashierLogin, watchCashierLogout, watchOpenAndGetCurrentShift,
    watchCreateNewShift, watchEditCartItem } from './Kiosk/sagas'

export default function * root () {
    yield [
        fork(watchKioskData),
        watchItems(),
        watchCategories(),
        watchDiscounts(),
        watchPostPurchase(),
        watchApplyDiscounts(),
        watchUndoOrders(),
        watchGetCreditForCrew(),
        watchCashierLogin(),
        watchCashierLogout(),
        watchOpenAndGetCurrentShift(),
        watchCreateNewShift(),
        watchEditCartItem()
    ]
}
