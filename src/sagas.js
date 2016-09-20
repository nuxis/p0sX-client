import { fork } from 'redux-saga/effects'
import { watchKioskData, watchItems, watchCategories, watchPostPurchase } from './Kiosk/sagas'
// import { loopGetOrders } from './Kitchen/sagas'

export default function * root () {
    yield [
        fork(watchKioskData),
        fork(watchItems),
        fork(watchCategories),
        watchPostPurchase(),
        fork(watchCategories)
        // This will fetch orders regularly, currently disabled as functionality is not done
        // fork(loopGetOrders)
    ]
}
