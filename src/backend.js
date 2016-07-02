import { get, post } from './request-wrapper'

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
                order.state === 0
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
            const openOrders = response.filter((order) => {
                order.state === 1
            })
            resolve(openOrders)
        }).catch(function (error) {
            reject(error)
        })
    })
}

export {
    getCategories,
    getIngredients,
    getItems,
    getUsers,
    getUser,
    postPurchase,
    getOpenOrders,
    getInProgressOrders
}
