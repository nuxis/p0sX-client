import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setPaymentState, setPaymentMethod, postPurchase, applyDiscounts, removeDiscounts, setPaymentModalOpen } from '../actions'
import { getTotalPriceOfCart, getLoggedInCashier, getStrings, getPurchaseInProgress } from '../selectors'
import { PAYMENT_METHOD } from '../../common/api'
import { NotificationManager } from 'react-notifications'
import { Step, Stepper, StepLabel, StepButton } from 'material-ui/Stepper'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import DoneIcon from 'material-ui/svg-icons/action/done'
import { green500 } from 'material-ui/styles/colors'

class PaymentModal extends React.Component {
    static propTypes = {
        onPurchase: PropTypes.func,
        paymentState: PropTypes.object,
        selectMethod: PropTypes.func,
        onBack: PropTypes.func,
        onClose: PropTypes.func,
        total: PropTypes.number,
        cashierCard: PropTypes.string,
        strings: PropTypes.object,
        purchaseInProgress: PropTypes.bool
    }

    componentDidMount () {
        this.setState({amount: '0'})
    }

    getPaymentSelect () {
        const { selectMethod, strings } = this.props
        return (
            <div>
                <Paper onClick={selectMethod} data-method={PAYMENT_METHOD.CASH} zDepth={2} className='item-card'>
                    <h5>{strings.cash}</h5>
                    <i className='fa fa-money payment-glyph' aria-hidden='true' />
                </Paper>
                <Paper onClick={selectMethod} data-method={PAYMENT_METHOD.CREDIT} zDepth={2} className='item-card'>
                    <h5>{strings.crew}</h5>
                    <i className='fa fa-credit-card payment-glyph' aria-hidden='true' />
                </Paper>
            </div>
        )
    }

    getCrew () {
        const { strings, purchaseInProgress } = this.props
        return (
            <div>
                <TextField ref='rfid' id='rfid' type='password' fullWidth hintText={strings.badge_number} onKeyUp={this.onEnter} />
                <RaisedButton onClick={this.purchaseCrew} primary label={strings.purchase} disabled={purchaseInProgress} />
            </div>
        )
    }

    getCash () {
        const { strings, purchaseInProgress } = this.props
        return (
            <div className='row'>
                <div className='col-xs-6'>
                    <div className='row' style={{height: '252px'}}>
                        <div className='bill-pad col-xs-12'>
                            <div onClick={this.billClick} className='col-xs-4 bill'>1</div>
                            <div onClick={this.billClick} className='col-xs-4 bill'>5</div>
                            <div onClick={this.billClick} className='col-xs-4 bill'>10</div>
                            <div onClick={this.billClick} className='col-xs-4 bill'>20</div>
                            <div onClick={this.billClick} className='col-xs-4 bill'>50</div>
                            <div onClick={this.billClick} className='col-xs-4 bill'>100</div>
                            <div onClick={this.billClick} className='col-xs-4 bill'>200</div>
                            <div onClick={this.billClick} className='col-xs-4 bill'>500</div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xs-12'>
                            <TextField ref='amount' id='amount' type='number' fullWidth value={this.state.amount} onChange={this.handleAmountChange} onKeyUp={this.onEnter} hintText={strings.amount_received} />
                        </div>
                        <div className='col-xs-12'>
                            <RaisedButton primary
                                fullWidth
                                style={{height: '50px'}}
                                labelStyle={{lineHeight: '50px'}}
                                onClick={this.purchaseCash}
                                label={strings.purchase}
                                disabled={purchaseInProgress} />
                        </div>
                    </div>
                </div>
                <div className='numpad col-xs-6'>
                    <div onClick={this.numpadClick} className='col-xs-4 button'>1</div>
                    <div onClick={this.numpadClick} className='col-xs-4 button'>2</div>
                    <div onClick={this.numpadClick} className='col-xs-4 button'>3</div>
                    <div onClick={this.numpadClick} className='col-xs-4 button'>4</div>
                    <div onClick={this.numpadClick} className='col-xs-4 button'>5</div>
                    <div onClick={this.numpadClick} className='col-xs-4 button'>6</div>
                    <div onClick={this.numpadClick} className='col-xs-4 button'>7</div>
                    <div onClick={this.numpadClick} className='col-xs-4 button'>8</div>
                    <div onClick={this.numpadClick} className='col-xs-4 button'>9</div>
                    <div onClick={this.numpadClick} className='col-xs-8 button'>0</div>
                    <div onClick={this.numpadClick} className='col-xs-4 button'>{strings.back}</div>
                </div>
            </div>
        )
    }

    getOrderComplete () {
        const { paymentState, strings } = this.props
        const total = this.state.total
        var amount = parseInt(this.state.amount)
        amount = amount === 0 || isNaN(amount) ? total : amount
        var completeString = ''

        if (paymentState.paymentMethod === PAYMENT_METHOD.CASH) {
            completeString = `${strings.return} ${amount - total} ${strings.price_text}`
            if (amount - total === 0) {
                setTimeout(() => this.onClose(), 5000)
            }
        } else if (paymentState.paymentMethod === PAYMENT_METHOD.CREDIT) {
            setTimeout(() => this.onClose(), 5000)
            completeString = 'YAY!'
        }

        return (
            <div className='row center-xs'>
                <div className='col-xs-6'>
                    <DoneIcon style={{height: '150px', width: '150px', color: green500}} />
                    <h2>{completeString}</h2>
                </div>
            </div>
        )
    }

    handleAmountChange = (event) => {
        this.setState({amount: event.target.value})
    }

    numpadClick = (e) => {
        const { strings } = this.props
        if (e.target.innerHTML === strings.back) {
            if (this.state.amount !== '0') {
                var next = this.state.amount.slice(0, -1)
                if (!next.length) {
                    next = '0'
                }
                this.setState({amount: next})
            }
        } else {
            const prev = this.state.amount === '0' ? '' : this.state.amount
            this.setState({amount: prev + e.target.innerHTML})
        }
    }

    billClick = (e) => {
        const amount = parseInt(this.state.amount || 0) + parseInt(e.target.innerHTML)
        this.setState({amount: `${amount}`})
    }

    onEnter = (e) => {
        if (e.keyCode === 13) {
            const { paymentState } = this.props
            switch (paymentState.paymentMethod) {
            case PAYMENT_METHOD.CREDIT:
                this.purchaseCrew()
                break
            case PAYMENT_METHOD.CASH:
                this.purchaseCash()
                break
            default:
                break
            }
        }
    }

    purchaseCrew = () => {
        const { onPurchase, total, cashierCard } = this.props
        const value = this.refs.rfid.getValue()

        if (value.length > 0) {
            const purchase = {
                payment_method: PAYMENT_METHOD.CREDIT,
                total: total,
                card: value,
                message: '',
                cashier_card: cashierCard
            }
            // eslint-disable-next-line immutable/no-mutation
            this.refs.rfid.input.value = ''
            onPurchase(purchase)
        }
    }

    purchaseCash = () => {
        const { onPurchase, total, cashierCard } = this.props
        var value = this.refs.amount.getValue()
        if (value === '') {
            value = '0'
        }
        // If crew badge is scanned in cash amount field we will get a stupidly high value. Cap at 1000000
        if (parseInt(value) > 1000000) {
            NotificationManager.error('Sales in excess of 1000000 is not supported', '', 3000)
        } else if ((value.length > 0 && parseInt(value) >= total) || value === '0') {
            this.setState({total: total})
            const purchase = {
                payment_method: PAYMENT_METHOD.CASH,
                total: total,
                amountReceived: value !== '0' ? value : total.toString(),
                message: '',
                cashier_card: cashierCard
            }
            onPurchase(purchase)
        } else {
            NotificationManager.error(`${value} is not enough, need ${total - value} more`, 'Need more coinz', 3000)
        }
    }

    componentDidUpdate (prevProps) {
        const { paymentState } = this.props
        const paymentMethod = paymentState.paymentMethod
        const stateIndex = paymentState.stateIndex
        const prevStateIndex = prevProps.paymentState.stateIndex

        if (prevStateIndex === stateIndex) {
            return
        }

        if (stateIndex === 1) {
            if (paymentMethod === PAYMENT_METHOD.CREDIT) {
                setTimeout(() => this.refs.rfid.focus(), 250)
            } else if (paymentMethod === PAYMENT_METHOD.CASH) {
                setTimeout(() => this.refs.amount.focus(), 250)
            }
        }
    }

    getStepContent (stepIndex, paymentMethod) {
        switch (stepIndex) {
        case 0:
            return this.getPaymentSelect()
        case 1:
            if (paymentMethod === PAYMENT_METHOD.CREDIT) {
                return this.getCrew()
            } else if (paymentMethod === PAYMENT_METHOD.CASH) {
                return this.getCash()
            }
            return this.getPaymentSelect()
        case 2:
            return this.getOrderComplete()
        default:
            return this.getPaymentSelect()
        }
    }

    onClose = () => {
        const { paymentState } = this.props
        if (paymentState.modalOpen) {
            this.setState({amount: ''})
            this.props.onClose()
        }
    }

    title = (stateIndex, strings, total) => {
        switch (stateIndex) {
        case 0:
            return strings.select_payment_method
        case 1:
            return `${strings.please_pay} ${total}${strings.price_text}`
        case 2:
            return strings.order_complete
        }
    }

    render () {
        const { paymentState, onBack, strings, total } = this.props
        const paymentMethod = paymentState.paymentMethod
        const stateIndex = paymentState.stateIndex

        const actions = [
            <FlatButton
                label={strings.close}
                primary
                onTouchTap={this.onClose}
            />
        ]

        return (
            <Dialog open={paymentState.modalOpen} modal={stateIndex !== 2} onRequestClose={this.onClose} actions={actions} title={this.title(stateIndex, strings, total)}>
                <Stepper activeStep={stateIndex} linear={false}>
                    <Step>
                        <StepButton onClick={onBack} completed={stateIndex > 0} disabled={stateIndex === 2}>{strings.select_payment_method}</StepButton>
                    </Step>
                    <Step>
                        <StepLabel completed={stateIndex === 2} disabled={stateIndex !== 1}>{strings.get_money}</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel completed={stateIndex === 2} disabled={stateIndex !== 2}>{strings.order_complete}</StepLabel>
                    </Step>
                </Stepper>
                <br />
                {this.getStepContent(stateIndex, paymentMethod)}
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        paymentState: state.payment,
        total: getTotalPriceOfCart(state),
        cashierCard: getLoggedInCashier(state).card,
        strings: getStrings(state),
        purchaseInProgress: getPurchaseInProgress(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPurchase: (options) => {
            dispatch(postPurchase(options))
        },
        selectMethod: (e) => {
            const method = parseInt(e.target.dataset.method)
            dispatch(setPaymentMethod(method))
            dispatch(setPaymentState(1))
            dispatch(applyDiscounts(method))
        },
        onBack: () => {
            dispatch(setPaymentState(0))
            dispatch(removeDiscounts())
        },
        onClose: () => {
            dispatch(setPaymentModalOpen(false))
            dispatch(setPaymentState(0))
            dispatch(removeDiscounts())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentModal)
