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
            <div style={{height: '100%', paddingTop: '8px'}} className='col col-xs-3 col-sm-3 col-md-3 col-lg-3'>
                <div className='row' style={{overflowY: 'auto', height: 'calc(100% - 46px)'}}>
                    <div className='col-xs-12'>
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
                </div>
                <div className='row' style={{paddingTop: '4px'}}>
                    <div className='col-xs-8' style={{paddingRight: '0'}}>
                        <RaisedButton onClick={onPurchase}
                            disabled={items.length === 0}
                            fullWidth
                            primary
                            label={strings.total + ' ' + total + strings.price_short}
                        />
                    </div>
                    <div className='col-xs-4' style={{paddingRight: '3px'}}>
                        <RaisedButton disabled={items.length === 0}
                            onClick={onEmptyCart}
                            fullWidth
                            backgroundColor={red500}
                            icon={<Delete style={{marginTop: '6px'}} color={white} />}
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
