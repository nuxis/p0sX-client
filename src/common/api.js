import axios from 'axios'

export const ORDER_STATE = {
    OPEN: '0',
    DONE: '1',
    ARCHIVED: '2'
}

export const PAYMENT_METHOD = {
    CASH: 0,
    CREW: 1,
    CARD: 2,
    VIPPS: 3,
    MCASH: 4,
    MOBILEPAY: 5,
    IZETTLE: 6
}

export const getCategories = () => {
    return axios.get('/categories/?format=json').then(res => res.data)
}

export const getItems = () => {
    return axios.get('/items/?format=json').then(res => res.data)
}

export const getUsers = () => {
    return axios.get('/users/?format=json').then(res => res.data)
}

export const getUser = (userId) => {
    return axios.get(`/users/${userId}/?format=json`).then(res => res.data)
}

export const postPurchase = (purchase) => {
    return axios.post('/purchases/?format=json', purchase)
}

export const getOrders = (state = '') => {
    return axios.get(`/orders/?format=json&state=${state}`).then(res => res.data)
}
