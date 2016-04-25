import axios from 'axios'
import settings from './settings'

const HEADERS = {
    'Authorization': `Token ${settings.get('api_auth_token')}`
}

const BASE_URL = settings.get('server_address')

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
    post
}

