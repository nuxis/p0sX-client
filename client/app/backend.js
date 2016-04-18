import { get, post } from './request-wrapper'

let get_categories = () => {
  return get('/categories/?format=json')
}

let get_ingredients = () => {
  return get('/ingredients/?format=json')
}

let get_items = () => {
  return get('/items/?format=json')
}

let get_users = () => {
  return get('/users/?format=json')
}

let get_user = (user_id) => {
  return get(`/users/${user_id}/?format=json`)
}

export default {
  get_categories,
  get_ingredients,
  get_items,
  get_users,
  get_user
}
