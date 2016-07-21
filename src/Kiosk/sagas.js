import { call, put, take } from 'redux-saga/effects'
import * as api from '../common/api'
import * as actions from './actions'

export function * watchKioskData () {
    while (true) {
        yield take(actions.GET_ALL_KIOSK_DATA)
        yield [
            call(getItems),
            call(getIngredients),
            call(getCategories)
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

export function * watchIngredients () {
    while (true) {
        yield take(actions.GET_INGREDIENTS)
        yield call(getIngredients)
    }
}

function * getIngredients () {
    try {
        const ingredients = yield call(api.getIngredients)
        yield put(actions.setIngredients(ingredients))
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
