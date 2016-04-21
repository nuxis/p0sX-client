import axios from 'axios'
import settings from './settings'

var HEADERS = {
    'Authorization': `Token ${settings.get('api_auth_token')}`
}

var BASE_URL = settings.get('server_address')

settings.watch('api_auth_token', (token) => {
    HEADERS['Authorization'] = `Token ${token.now}`
})

settings.watch('server_address', (server) => {
    BASE_URL = server.now
})

const get = (endpoint) => {
    const url = `${BASE_URL}${endpoint}`
    const options = {
        headers: HEADERS,
        timeout: 2000
    }
    return axios.get(url, options)
}

const post = (endpoint, data) => {
    const url = `${BASE_URL}${endpoint}`
    const options = {
        headers: HEADERS,
        timeout: 2000,
        data: data
    }
    return axios.post(url, options)
}

export {
    get,
    post,

}

