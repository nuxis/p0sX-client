import React from 'react'
import CartEntry from './CartEntry.jsx'
import CheckoutButton from './CheckoutButton.jsx'
import EmptyCartButton from './EmptyCartButton.jsx'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { emptyCart, removeItemFromCart } from '../actions'
import { getRenderedCart, getTotalPriceOfCart } from '../selectors'
import { List } from 'immutable'

const Cart = React.createClass({
    propTypes: {
        items: React.PropTypes.instanceOf(List).isRequired,
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
        console.log('cart func: ', onRemoveItem)

        return (
            <div style={{height: '100%'}} className='col s12 m3 l3'>
                <div className='cart-list' style={{overflowY: 'auto', height: 'calc(100% - 60px)', margin: '7.25px 0 5px 0'}}>
                    <ul style={{margin: '0 0 0 0'}} className={listClass}>
                        {items.map((entry, index) =>
                            <CartEntry
                                key={index}
                                price={entry.get('item').get('price')}
                                name={entry.get('item').get('name')}
                                image={entry.get('item').get('image') || require('../../images/planet.png')}
                                ingredients={entry.get('ingredients')}
                                onRemoveItem={() => { onRemoveItem(index) }}
                            />
                        )}
                    </ul>
                </div>
                <CheckoutButton onClick={onPurchase} total={total} active={items.isEmpty()} />
                <EmptyCartButton onClick={onEmptyCart} active={items.isEmpty()} />
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    return {
        items: getRenderedCart(state),
        total: getTotalPriceOfCart(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onEmptyCart: () => {
            dispatch(emptyCart())
        },
        onRemoveItem: (itemIndex) => {
            dispatch(removeItemFromCart(itemIndex))
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
