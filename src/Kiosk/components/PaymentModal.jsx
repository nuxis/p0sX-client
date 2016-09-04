import React from 'react'
import { connect } from 'react-redux'
import { emptyCart, setPaymentState } from '../actions'

class PaymentModal extends React.Component {
    static propTypes = {
        onPurchase: React.PropTypes.func.isRequired,
        paymentState: React.PropTypes.string.isRequired,
        selectCrew: React.PropTypes.func.isRequired
    }

    renderPaymentSelect () {
        const { selectCrew } = this.props
        return (
            <div id='payment-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h4>Choose payment option</h4>
                    <div className='item-card z-depth-1 hoverable waves-effect'>
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
                    <h4>Scan badge</h4>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input ref='rfid' id='rfid' type='number' className='validate' />
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

    purchaseCrew () {
        const { onPurchase } = this.props
        const badge = this.refs.rfid.value

        onPurchase({badge: badge})
    }

    componentDidUpdate () {
        if (this.refs.rfid !== undefined) {
            this.refs.rfid.focus()
        }
    }

    render () {
        const { paymentState } = this.props
        switch (paymentState) {
        case 'select':
            return this.renderPaymentSelect()
        case 'crew':
            return this.renderCrew()
        default:
            return this.renderPaymentSelect()
        }
    }
}

const mapStateToProps = (state) => {
    return {
        paymentState: state.payment.get('state')
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
