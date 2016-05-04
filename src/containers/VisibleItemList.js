import { connect } from 'react-redux'
import { addToCart, setInitialData, openModal } from '../actions'
import ItemList from '../components/ItemList.jsx'
import { getCategoryById } from '../reducers'

const getVisibleItems = (state, category) => {
    if (category === 0) {
        var categories = state.categories.filter((c) => c.id !== 0)
        return categories.map((c) => {
            return {
                category: c,
                items: state.items.filter((i) => i.category === c.id)
            }
        })
    } else {
        return [{
            category: getCategoryById(state, category),
            items: state.items.filter((i) => i.category === category)
        }]
    }
}

const mapStateToProps = (state) => {
    return {
        items: getVisibleItems(state, state.selectedCategory)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // eslint-disable-next-line camelcase
        onItemClick: (item, can_have_ingredients) => {
            // eslint-disable-next-line camelcase
            if (can_have_ingredients) {
                $('#ingredient-modal').openModal()
                dispatch(openModal(item))
            } else {
                dispatch(addToCart(item))
            }
        },
        getInitialData: () => {
            dispatch(setInitialData())
        }
    }
}

const VisibleItemList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList)

export default VisibleItemList
