import React from 'react'
import CartEntry from './CartEntry.jsx'
import { connect } from 'react-redux'
import { emptyCart, removeItemFromCart, editCartItem } from '../actions'
import { getRenderedCart, getTotalPriceOfCart } from '../selectors'
import { List as ImmutableList } from 'immutable'
import { open as openPaymentModal } from './PaymentModal'
import {List} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import Delete from 'material-ui/svg-icons/action/delete'
import {white, red500} from 'material-ui/styles/colors'

class Cart extends React.Component {
    static propTypes = {
        items: React.PropTypes.instanceOf(ImmutableList),
        onEmptyCart: React.PropTypes.func,
        onRemoveItem: React.PropTypes.func,
        onEditItem: React.PropTypes.func,
        onPurchase: React.PropTypes.func,
        total: React.PropTypes.number
    }

    render () {
        const { items, onEmptyCart, onRemoveItem, onEditItem, onPurchase, total } = this.props
        const placeholderImage = require('../../images/planet.png')
        return (
            <div style={{height: '100%'}} className='col col-xs-3 col-sm-3 col-md-3 col-lg-3'>
                <div className='row' style={{overflowY: 'auto', height: 'calc(100% - 45px)', paddingTop: '8px'}}>
                    <div className='col-xs-12'>
                        <List>
                            {items.reverse().map((entry, index) =>
                                <CartEntry
                                    key={index}
                                    price={entry.get('item').get('price')}
                                    name={entry.get('item').get('name')}
                                    image={entry.get('item').get('image') || placeholderImage}
                                    ingredients={entry.get('ingredients')}
                                    index={(items.size - 1) - index}
                                    onRemoveItem={onRemoveItem}
                                    onEditItem={onEditItem}
                                    editable={entry.get('item').get('created_in_the_kitchen')}
                                />
                            )}
                        </List>
                    </div>
                </div>
                <div className='row' style={{paddingTop: '4px'}}>
                    <div className='col-xs-8'>
                        <RaisedButton onClick={onPurchase}
                            disabled={items.isEmpty()}
                            fullWidth primary
                            label={'Total: ' + total + ',-'}
                        />
                    </div>
                    <div className='col-xs-4 xs-last'>
                        <RaisedButton disabled={items.isEmpty()}
                            onClick={onEmptyCart}
                            fullWidth
                            backgroundColor={red500}
                            icon={<Delete color={white} />}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: getRenderedCart(state),
        total: getTotalPriceOfCart(state)
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
            openPaymentModal()
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)
