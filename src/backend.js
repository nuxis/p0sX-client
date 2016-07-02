import { get, post } from './request-wrapper'

const ORDER_STATE = {
    'OPEN': 0,
    'IN_PROGRESS': 1,
    'DELIVERED': 2
}

const PAYMENT_METHOD = {
    'CASH': 0,
    'CREW': 1,
    'CARD': 2,
    'VIPPS': 3,
    'MCASH': 4,
    'MOBILEPAY': 5,
    'IZETTLE': 6
}

const getCategories = () => {
    return get('/categories/?format=json')
}

const getIngredients = () => {
    return get('/ingredients/?format=json')
}

const getItems = () => {
    return get('/items/?format=json')
}

const getUsers = () => {
    return get('/users/?format=json')
}

const getUser = (userId) => {
    return get(`/users/${userId}/?format=json`)
}

const postPurchase = (purchase) => {
    return post('/purchases/', purchase)
}

const getOrders = () => {
    return get('/orders/?format=json')
}

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
    getInProgressOrders
}
