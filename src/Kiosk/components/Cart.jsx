import React from 'react'
import PropTypes from 'prop-types'
import CartEntry from './CartEntry.jsx'
import { connect } from 'react-redux'
import { emptyCart, removeItemFromCart, editCartItem, setPaymentModalOpen } from '../actions'
import { getRenderedCart, getTotalPriceOfCart, getStrings } from '../selectors'
import {List} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import Delete from 'material-ui/svg-icons/action/delete'
import {white, red500} from 'material-ui/styles/colors'

class Cart extends React.Component {
    static propTypes = {
        items: PropTypes.array,
        onEmptyCart: PropTypes.func,
        onRemoveItem: PropTypes.func,
        onEditItem: PropTypes.func,
        onPurchase: PropTypes.func,
        total: PropTypes.number,
        strings: PropTypes.object
    }

    render () {
        const { items, onEmptyCart, onRemoveItem, onEditItem, onPurchase, total, strings } = this.props
        // const placeholderImage = require('../../images/planet.png')
        return (
            <div className='cart'>
                <div className='cart-items'>
                    <List>
                        {items.reverse().map((entry, index) =>
                            <CartEntry
                                key={index}
                                price={entry.item.price}
                                name={entry.item.name}
                                image={entry.item.image || './images/planet.png'}
                                ingredients={entry.ingredients}
                                index={(items.length - 1) - index}
                                onRemoveItem={onRemoveItem}
                                onEditItem={onEditItem}
                                editable={entry.item.created_in_the_kitchen}
                                price_text={strings.price_short}
                            />
                        )}
                    </List>
                </div>
                <div className='purchase-button'>
                    <RaisedButton onClick={onPurchase}
                        disabled={items.length === 0}
                        style={{height: '7vh'}}
                        labelStyle={{lineHeight: '7vh'}}
                        fullWidth
                        primary
                        label={strings.total + ' ' + total + strings.price_short}
                    />
                </div>
                <div className='cart-clear'>
                    <RaisedButton disabled={items.length === 0}
                        onClick={onEmptyCart}
                        style={{height: '7vh'}}
                        labelStyle={{lineHeight: '7vh'}}
                        fullWidth
                        backgroundColor={red500}
                        icon={<Delete style={{marginTop: '2.1vh'}} color={white} />}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: getRenderedCart(state),
        total: getTotalPriceOfCart(state),
        strings: getStrings(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEmptyCart: () => {
            dispatch(emptyCart())
        },
        onRemoveItem: (itemIndex) => {
            dispatch(removeItemFromCart(itemIndex))
        },
        onEditItem: (itemIndex) => {
            dispatch(editCartItem(itemIndex))
        },
        onPurchase: () => {
            dispatch(setPaymentModalOpen(true))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)
