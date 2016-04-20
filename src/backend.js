import { get } from './request-wrapper'

export const get_categories = () => {
    return get('/categories/?format=json')
}

export const get_ingredients = () => {
    return get('/ingredients/?format=json')
}

export const get_items = () => {
    return get('/items/?format=json')
}

export const get_users = () => {
    return get('/users/?format=json')
}

export const get_user = (user_id) => {
    return get(`/users/${user_id}/?format=json`)
}

export default {
    get_categories,
    get_ingredients,
    get_items,
    get_users,
    get_user
}
