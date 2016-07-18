import { fork } from 'redux-saga/effects'
import { watchKioskData, watchItems, watchIngredients, watchCategories, watchPostPurchase } from './Kiosk/sagas'
import { loopGetOrders } from './Kitchen/sagas'

export default function * root () {
    yield [
        fork(watchKioskData),
        fork(watchItems),
        fork(watchCategories),
        watchPostPurchase(),
        fork(watchIngredients),
        fork(watchCategories),
        fork(loopGetOrders)
    ]
}
