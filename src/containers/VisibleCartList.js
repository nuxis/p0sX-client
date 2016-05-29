import { connect } from 'react-redux'
import { emptyCart, removeItem } from '../actions'
import Cart from '../components/Cart.jsx'
import {getItemById, getIngredientById} from '../store'

const getVisibleItems = (state, cart) => {
    return cart.map((entry) => {
        var item = Object.assign({}, getItemById(entry.item))
        return Object.assign(item, entry, {
            price: entry.ingredients.reduce((total, ingredient) => {
                return total + parseInt(getIngredientById(ingredient).price)
            }, item.price),
            ingredients: entry.ingredients.map((ingredient) => {
                return getIngredientById(ingredient)
            })
        })
    })
}

const getTotalPrice = (state, cart) => {
    return cart.reduce((total, entry) => {
        total += getItemById(entry.item).price
        total += entry.ingredients.reduce((sum, ingredient) => {
            return sum + parseInt(getIngredientById(ingredient).price)
        }, 0)
        return total
    }, 0)
}

const mapStateToProps = (state) => {
    return {
        items: getVisibleItems(state, state.cart),
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
