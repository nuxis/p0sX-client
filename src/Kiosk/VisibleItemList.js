import { connect } from 'react-redux'
import { addItemToCart, openIngredientModalForItem } from './actions'
import ItemList from './components/ItemList.jsx'
import { getSelectedCategory, getItems } from './selectors'

const getVisibleItems = (items, category) => {
    if (category === 0) {
        return items
    } else {
        return items.filter((i) => i.category === category)
    }
}

const mapStateToProps = (state) => {
    return {
        items: getVisibleItems(getItems(state), getSelectedCategory(state))
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // eslint-disable-next-line camelcase
        onItemClick: (item, can_have_ingredients) => {
            // eslint-disable-next-line camelcase
            if (can_have_ingredients) {
                $('#ingredient-modal').openModal()
                dispatch(openIngredientModalForItem(item))
            } else {
                dispatch(addItemToCart(item))
            }
        }
    }
}

const VisibleItemList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList)

export default VisibleItemList
