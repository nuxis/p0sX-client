import React from 'react'
import { connect } from 'react-redux'
import { setPaymentState, postPurchase } from '../actions'
import { getTotalPriceOfCart, getRenderedCart } from '../selectors'
import { PAYMENT_METHOD } from '../../common/api'

class PaymentModal extends React.Component {
    static propTypes = {
        onPurchase: React.PropTypes.func.isRequired,
        paymentState: React.PropTypes.string.isRequired,
        selectCrew: React.PropTypes.func.isRequired,
        selectCash: React.PropTypes.func.isRequired,
        onBack: React.PropTypes.func.isRequired,
        total: React.PropTypes.number.isRequired,
        cart: React.PropTypes.object.isRequired
    }

    renderPaymentSelect () {
        const { selectCrew, selectCash } = this.props
        return (
            <div id='payment-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h4>Choose payment option</h4>
                    <div onClick={selectCash} className='item-card z-depth-1 hoverable waves-effect'>
                        <h5>Cash</h5>
                        <i className='fa fa-money payment-glyph' aria-hidden='true' />
                    </div>
                    <div onClick={selectCrew} className='item-card z-depth-1 hoverable waves-effect'>
                        <h5>Crew</h5>
                        <i className='fa fa-credit-card payment-glyph' aria-hidden='true' />
                    </div>
                </div>
                <div className='modal-footer'>
                    <a href='#!' className='modal-action modal-close waves-effect waves-red btn-flat'>Cancel</a>
                </div>
            </div>
        )
    }

    renderCrew () {
        return (
            <div id='payment-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h4><i onClick={::this.back} className='link fa fa-arrow-circle-o-left' aria-hidden='true' /> Scan badge</h4>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input onKeyUp={::this.onEnter} ref='rfid' id='rfid' type='number' required className='validate' />
                            <label className='active' htmlFor='rfid'>Badge number</label>
                        </div>
                        <div className='input-field col s12'>
                            <input onKeyUp={::this.onEnter} ref='message' id='message' type='text' required maxLength='64' className='validate' />
                            <label htmlFor='message'>Message for the kitchen</label>
                        </div>
                        <button className='btn btn-large waves-effect waves-light' onClick={::this.purchaseCrew}>
                            Purchase
                        </button>
                    </div>
                </div>
                <div className='modal-footer'>
                    <a href='#!' className='modal-action modal-close waves-effect waves-red btn-flat'>Cancel</a>
                </div>
            </div>
        )
    }

    renderCash () {
        const { total } = this.props
        return (
            <div id='payment-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h4><i onClick={::this.back} className='link fa fa-arrow-circle-o-left' aria-hidden='true' /> Please pay {total}Kr.</h4>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input onKeyUp={::this.onEnter} ref='amount' id='amount' type='number' required min={total} className='validate' />
                            <label className='active' htmlFor='amount'>Amount received</label>
                        </div>
                        <div className='input-field col s12'>
                            <input onKeyUp={::this.onEnter} ref='message' id='message' type='text' required maxLength='64' className='validate' />
                            <label htmlFor='message'>Message for the kitchen</label>
                        </div>
                        <button className='btn btn-large waves-effect waves-light' onClick={::this.purchaseCash}>
                            Purchase
                        </button>
                    </div>
                </div>
                <div className='modal-footer'>
                    <a href='#!' className='modal-action modal-close waves-effect waves-red btn-flat'>Cancel</a>
                </div>
            </div>
        )
    }

    back () {
        const { onBack } = this.props
        onBack()
    }

    onEnter (e) {
        if (e.keyCode === 13) {
            const { paymentState } = this.props
            switch (paymentState) {
            case 'crew':
                this.purchaseCrew()
                break
            case 'cash':
                this.purchaseCash()
                break
            default:
                break
            }
        }
    }

    purchaseCrew () {
        const { onPurchase, cart } = this.props
        const { value, validity } = this.refs.rfid
        const message = this.refs.message.value

        if (validity.valid) {
            const purchase = {
                payment_method: PAYMENT_METHOD.CREW,
                card: value,
                message: message,
                lines: cart.map(entry => {
                    return {
                        item: entry.get('item').get('id'),
                        ingredients: entry.get('ingredients').map(ingredient => ingredient.get('id'))
                    }
                })
            }
            onPurchase(purchase)
        }
    }

    purchaseCash () {
        const { onPurchase, cart } = this.props
        const { validity } = this.refs.amount
        const message = this.refs.message.value

        if (validity.valid) {
            const purchase = {
                payment_method: PAYMENT_METHOD.CASH,
                message: message,
                lines: cart.map(entry => {
                    return {
                        item: entry.get('item').get('id'),
                        ingredients: entry.get('ingredients').map(ingredient => ingredient.get('id'))
                    }
                })
            }
            onPurchase(purchase)
        }
    }

    componentDidUpdate () {
        if (this.refs.rfid !== undefined) {
            this.refs.rfid.focus()
        }
        if (this.refs.amount !== undefined) {
            this.refs.amount.focus()
        }
    }

    render () {
        const { paymentState } = this.props
        switch (paymentState) {
        case 'select':
            return this.renderPaymentSelect()
        case 'crew':
            return this.renderCrew()
        case 'cash':
            return this.renderCash()
        default:
            return this.renderPaymentSelect()
        }
    }
}

const mapStateToProps = (state) => {
    return {
        paymentState: state.payment.get('state'),
        total: getTotalPriceOfCart(state),
        cart: getRenderedCart(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPurchase: (options) => {
            console.log('Purchase ', options)
            dispatch(postPurchase(options))
        },
        selectCrew: () => {
            dispatch(setPaymentState('crew'))
        },
        selectCash: () => {
            dispatch(setPaymentState('cash'))
        },
        onBack: () => {
            dispatch(setPaymentState('select'))
        }
    }
}

const open = () => {
    $('#payment-modal').openModal()
}

const close = () => {
    $('#payment-modal').closeModal()
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentModal)

export {
    open,
    close
}
