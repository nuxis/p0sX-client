import * as kioskSagas from './Kiosk/sagas'

export default function * root () {
    yield [
        kioskSagas.watchKioskData(),
        kioskSagas.watchItems(),
        kioskSagas.watchCategories(),
        kioskSagas.watchDiscounts(),
        kioskSagas.watchPostPurchase(),
        kioskSagas.watchApplyDiscounts(),
        kioskSagas.watchUndoOrders(),
        kioskSagas.watchGetCreditForCrew(),
        kioskSagas.watchCashierLogin(),
        kioskSagas.watchCashierLogout(),
        kioskSagas.watchOpenAndGetCurrentShift(),
        kioskSagas.watchCreateNewShift(),
        kioskSagas.watchEditCartItem()
    ]
}
