import axios from 'axios'
import settings from './settings'

const HEADERS = {
    'Authorization': `Token ${settings.get('api_auth_token')}`
}

const BASE_URL = settings.get('server_address')

export const get = (endpoint) => {
    let url = `${BASE_URL}${endpoint}`
    let options = {
        headers: HEADERS,
        timeout: 2000
    }
    return axios.get(url, options)
}

export const post = (endpoint, data) => {
    let url = `${BASE_URL}${endpoint}`
    let options = {
        headers: HEADERS,
        timeout: 2000,
        data: data
    }
    return axios.post(url, options)
}

export default {
    get,
    post
}

