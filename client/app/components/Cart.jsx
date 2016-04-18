import React from 'react'
import CartEntry from './CartEntry.jsx'
import CheckoutButton from './CheckoutButton.jsx'

const Cart = React.createClass({
    propTypes: {
        items: React.PropTypes.node.isRequired,
        cart: React.PropTypes.node.isRequired,
        onEmptyCart: React.PropTypes.func.isRequired,
        onRemoveItem: React.PropTypes.func.isRequired,
        onPurchase: React.PropTypes.func.isRequired,
        total: React.PropTypes.number.isRequired
    },
    render: function () {
        const { items, cart, onEmptyCart, onRemoveItem, onPurchase, total } = this.props
        return (
            <div className='col s12 m3 l3'>
                <h4>
                    Cart
                    <a className='btn-floating waves-effect waves-light right red' onClick={onEmptyCart}><i className='material-icons'>delete</i></a>
                </h4>
                <ul className='collection'>
                    {items.map((entry, i) =>
                        <CartEntry
                            key={i}
                            price={entry.price}
                            name={entry.name}
                            ingredients={entry.ingredients}
                            removeItem={() => onRemoveItem(i)}
                        />
                    )}
                </ul>
                <CheckoutButton onClick={() => onPurchase()} total={total} />
            </div>
        )
    }
})

export default Cart
