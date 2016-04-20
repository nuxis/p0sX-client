import React from 'react'
import CartEntry from './CartEntry.jsx'
import CheckoutButton from './CheckoutButton.jsx'
import classNames from 'classnames'

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
        const { items, onEmptyCart, onRemoveItem, onPurchase, total } = this.props
        var listClass = classNames('collection', {
            'hide': items.length === 0
        })

        return (
            <div style={{height: 'calc(100% - 10px)'}} className='col s12 m3 l3'>
                <h4>
                    Cart
                    <a className='btn-floating waves-effect waves-light right red' onClick={onEmptyCart}><i className='material-icons'>delete</i></a>
                </h4>
                <div className='cart-list' style={{overflowY: 'auto', height: 'calc(100% - 84px)'}}>
                    <ul className={listClass}>
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
                </div>
                <CheckoutButton onClick={() => onPurchase()} total={total} />
            </div>
        )
    }
})

export default Cart
