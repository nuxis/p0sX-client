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
    'CREW': 1,
    'CARD': 2,
    'VIPPS': 3,
    'MCASH': 4,
    'MOBILEPAY': 5,
    'IZETTLE': 6,
    'UNDO': 7
}

const getCategories = () => {
    return axios.get('/categories/?format=json').then(res => res.data).catch(() => showError())
}

const getDiscounts = () => {
    return axios.get('/discounts/?format=json').then(res => res.data).catch(() => showError())
}

const getIngredients = () => {
    return axios.get('/ingredients/?format=json').then(res => res.data).catch(() => showError())
}

const getItems = () => {
    return axios.get('/items/?format=json').then(res => res.data).catch(() => showError())
}

const getUsers = () => {
    return axios.get('/users/?format=json').then(res => res.data).catch(() => showError())
}

const getUser = (userId) => {
    return axios.get(`/users/${userId}/?format=json`).then(res => res.data).catch(() => showError())
}

const postPurchase = (purchase) => {
    return axios.post('/purchases/?format=json', purchase).then(res => res.data).catch(() => showError())
}

const getOrders = () => {
    return axios.get('/orders/?format=json').then(res => res.data).catch(() => showError())
}

const getCreditForCrew = (badge) => {
    return axios.get(`/credit/${badge}/?format=json`)
        .then(res => res.data)
        .catch(() => {
            NotificationManager.error('Unable to fetch credit info for user', '', 5000)
        })
}

const showError = () => {
    NotificationManager.error('Try again. If the error persists contact Tech crew', 'Purchase failed', 5000)
}

// Something probably has to be done here...
const getOpenOrders = () => {
    return new Promise(function (resolve, reject) {
        getOrders().then(function (response) {
            const openOrders = response.filter((order) => {
                return order.state === ORDER_STATE.OPEN
            })
            resolve(openOrders)
        }).catch(function (error) {
            reject(error)
        })
    })
}

const getInProgressOrders = () => {
    return new Promise(function (resolve, reject) {
        getOrders().then(function (response) {
            const inProgressOrders = response.filter((order) => {
                return order.state === ORDER_STATE.IN_PROGRESS
            })
            resolve(inProgressOrders)
        }).catch(function (error) {
            reject(error)
        })
    })
}

export {
    ORDER_STATE,
    PAYMENT_METHOD,
    getCategories,
    getIngredients,
    getItems,
    getUsers,
    getUser,
    postPurchase,
    getOpenOrders,
    getInProgressOrders,
    getDiscounts,
    getCreditForCrew
}
