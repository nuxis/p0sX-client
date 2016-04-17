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

module.exports = {
  get_categories,
  get_ingredients,
  get_items
}
