export const addToCart = (item) => {
  return {
    type: 'ADD_TO_CART',
    item: item
  }
}

export const setItems = (items) => {
  
  return {
    type: 'SET_ITEMS',
    items: items
  }
}

export const addCategories = (categories) => {
  return {
    type: 'ADD_CATEGORIES',
    categories: categories
  }
}

export const setActiveCategory = (id) => {
  return {
    type: 'SET_ACTIVE_CATEGORY',
    id: id
  }
}
