import React from 'react'
import { connect } from 'react-redux'
import { emptyCart, setPaymentState } from '../actions'
import { getTotalPriceOfCart } from '../selectors'

class PaymentModal extends React.Component {
    static propTypes = {
        onPurchase: React.PropTypes.func.isRequired,
        paymentState: React.PropTypes.string.isRequired,
        selectCrew: React.PropTypes.func.isRequired,
        selectCash: React.PropTypes.func.isRequired,
        onBack: React.PropTypes.func.isRequired,
        total: React.PropTypes.number.isRequired
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
                    <h4><i onClick={::this.back} className='link fa fa-arrow-circle-o-left' aria-hidden='true' /> Enter amount</h4>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input onKeyUp={::this.onEnter} ref='amount' id='amount' type='number' required min={total} className='validate' />
                            <label className='active' htmlFor='amount'>Amount received</label>
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
        const { onPurchase } = this.props
        const { value, validity } = this.refs.rfid

        if (validity.valid) {
            onPurchase({type: 'crew', badge: value})
        }
    }

    purchaseCash () {
        const { onPurchase } = this.props
        const { value, validity } = this.refs.amount

        if (validity.valid) {
            onPurchase({type: 'cash', amount: parseInt(value)})
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
        total: getTotalPriceOfCart(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPurchase: (options) => {
            console.log('Purchasing with:', options)

            // Do this on callback from purchase call to server
            // or show some error message in the modal
            close()
            dispatch(emptyCart())
            dispatch(setPaymentState('select'))
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
    open
}
