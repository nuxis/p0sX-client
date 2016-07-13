import { fork } from 'redux-saga/effects'
import { watchKioskData, watchItems, watchIngredients, watchCategories } from './Kiosk/sagas'

export default function * root () {
    yield [
        fork(watchKioskData),
        fork(watchItems),
        fork(watchIngredients),
        fork(watchCategories)
    ]
}
