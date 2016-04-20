import { connect } from 'react-redux'
import { emptyCart, removeItem } from '../actions'
import Cart from '../components/Cart.jsx'
import {getItemById, getIngredientById} from '../reducers'

const getVisibleItems = (state, cart) => {
    return cart.map((entry) => {
        var item = Object.assign({}, getItemById(state, entry.id))
        item = Object.assign(item, entry)

        item.price = item.ingredients.reduce((total, ingredient) => {
            return total + parseInt(getIngredientById(state, ingredient).price)
        }, item.price)

        item.ingredients = item.ingredients.map((ingredient) => {
            return getIngredientById(state, ingredient)
        })

        return item
    })
}

const getTotalPrice = (state, cart) => {
    return cart.reduce((total, entry) => {
        total += getItemById(state, entry.id).price
        total += entry.ingredients.reduce((sum, ingredient) => {
            return sum + parseInt(getIngredientById(state, ingredient).price)
        }, 0)
        return total
    }, 0)
}

const mapStateToProps = (state) => {
    return {
        items: getVisibleItems(state, state.cart),
        cart: state.cart,
        total: getTotalPrice(state, state.cart)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEmptyCart: () => {
            dispatch(emptyCart())
        },
        onRemoveItem: (item) => {
            dispatch(removeItem(item))
        },
        onPurchase: () => {
            console.log('Purchase')
        }
    }
}

const VisibleCartList = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)

export default VisibleCartList
