import React from 'react'
import CartEntry from './CartEntry.jsx'
import CheckoutButton from './CheckoutButton.jsx'
import EmptyCartButton from './EmptyCartButton.jsx'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { emptyCart, removeItemFromCart } from '../actions'
import { getCart, getTotalPriceOfCart } from '../selectors'

const Cart = React.createClass({
    propTypes: {
        items: React.PropTypes.array.isRequired,
        onEmptyCart: React.PropTypes.func.isRequired,
        onRemoveItem: React.PropTypes.func.isRequired,
        onPurchase: React.PropTypes.func.isRequired,
        total: React.PropTypes.number.isRequired
    },
    render: function () {
        const { items, onEmptyCart, onRemoveItem, onPurchase, total } = this.props
        var listClass = classNames('collection', {
            'hide': items.length === 0
        })

        console.log('cart component items: ', items)

        return (
            <div style={{height: '100%'}} className='col s12 m3 l3'>
                <div className='cart-list' style={{overflowY: 'auto', height: 'calc(100% - 60px)', margin: '7.25px 0 5px 0'}}>
                    <ul style={{margin: '0 0 0 0'}} className={listClass}>
                        {items.map((entry, index) =>
                            <CartEntry
                                key={index}
                                price={entry.item.get('price')}
                                name={entry.item.get('name')}
                                image={entry.item.get('image') || require('../../images/planet.png')}
                                ingredients={entry.ingredients}
                                removeItem={() => onRemoveItem(entry)}
                            />
                        )}
                    </ul>
                </div>
                <CheckoutButton onClick={onPurchase} total={total} active={items.size !== 0} />
                <EmptyCartButton onClick={onEmptyCart} active={items.size !== 0} />
            </div>
        )
    }
})

/* const getVisibleItems = (state, cart) => {
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
   total += entry.item.price
   total += entry.ingredients.reduce((sum, ingredient) => {
   return sum + parseInt(ingredient.price)
   }, 0)
   return total
   }, 0)
   } */

const mapStateToProps = (state) => {
    return {
        items: getCart(state),
        total: getTotalPriceOfCart(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEmptyCart: () => {
            dispatch(emptyCart())
        },
        onRemoveItem: (item) => {
            dispatch(removeItemFromCart(item))
        },
        onPurchase: () => {
            console.error('Purchase is not implemented :(')
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)
