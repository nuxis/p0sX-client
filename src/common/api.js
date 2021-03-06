import axios from 'axios'
import { NotificationManager } from 'react-notifications'

const ORDER_STATE = {
    'OPEN': 0,
    'IN_PROGRESS': 1,
    'DELIVERED': 2
}

const PAYMENT_METHOD = {
    'SELECT': -1,
    'CASH': 0,
    'CREDIT': 1,
    'CARD': 2,
    'VIPPS': 3,
    'MCASH': 4,
    'MOBILEPAY': 5,
    'IZETTLE': 6,
    'UNDO': 7
}

const getCategories = () => {
    return axios.get('/categories/?format=json').then(res => res.data).catch(() => showFetchDataError())
}

const getDiscounts = () => {
    return axios.get('/discounts/?format=json').then(res => res.data).catch(() => showFetchDataError())
}

const getIngredients = () => {
    return axios.get('/ingredients/?format=json').then(res => res.data).catch(() => showFetchDataError())
}

const getItems = () => {
    return axios.get('/items/?format=json').then(res => res.data).catch(() => showFetchDataError())
}

const postPurchase = (purchase) => {
    return axios.post('/purchases/?format=json', purchase).then(res => res.data).catch((e) => showPurchaseError(e))
}

const getOrders = () => {
    return axios.get('/orders/?format=json').then(res => res.data).catch(() => showFetchDataError())
}

const getCreditForCrew = (badge) => {
    return axios.get(`/credit/${badge}/?format=json`)
        .then(res => res.data)
        .catch(() => {
            NotificationManager.error('Unable to fetch credit info for user', '', 5000)
        })
}

const getUser = (card = '') => {
    return axios.get(`/user/?format=json&card=${card}`).then(res => res.data).catch(() => showPurchaseError())
}

const createShift = (data) => {
    return axios.post('/create_shift/', data).then(res => res.data).catch(() => NotificationManager.error('Try again. If the error persists contact Tech crew', 'Creating new shift failed', 5000))
}

const getCurrentShift = () => {
    return axios.get('/current_shift').then(res => res.data).catch(() => showPurchaseError())
}

const showFetchDataError = () => {
    NotificationManager.error('Failed to get data from the server', '', 5000)
}

const showPurchaseError = (e) => {
    if (e.response.data.detail !== undefined) {
        NotificationManager.error(e.response.data.detail, 'Purchase failed', 5000)
    } else {
        NotificationManager.error('Try again. If the error persists contact Tech crew', 'Purchase failed', 5000)
    }
}

export {
    ORDER_STATE,
    PAYMENT_METHOD,
    getCategories,
    getIngredients,
    getItems,
    postPurchase,
    getOrders,
    getDiscounts,
    getCreditForCrew,
    getUser,
    createShift,
    getCurrentShift
}
