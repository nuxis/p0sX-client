import React from 'react'
import CartEntry from './CartEntry.jsx'
import CheckoutButton from './CheckoutButton.jsx'
import EmptyCartButton from './EmptyCartButton.jsx'
import classNames from 'classnames'

const Cart = React.createClass({
    propTypes: {
        items: React.PropTypes.array.isRequired,
        cart: React.PropTypes.array.isRequired,
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
            <div style={{height: '100%'}} className='col s12 m3 l3'>
                <div className='cart-list' style={{overflowY: 'auto', height: 'calc(100% - 54px)', margin: '7.25px 0 5px 0'}}>
                    <ul style={{margin: '0 0 0 0'}} className={listClass}>
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
                <EmptyCartButton onClick={onEmptyCart} entries={items.length} />
                
            </div>
        )
    }
})

export default Cart
