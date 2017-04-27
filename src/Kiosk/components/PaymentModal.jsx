import React from 'react'
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
        onPurchase: React.PropTypes.func,
        paymentState: React.PropTypes.object,
        selectMethod: React.PropTypes.func,
        onBack: React.PropTypes.func,
        onClose: React.PropTypes.func,
        total: React.PropTypes.number,
        cashierCard: React.PropTypes.string,
        strings: React.PropTypes.object,
        purchaseInProgress: React.PropTypes.bool
    }

    componentDidMount () {
        this.setState({amount: ''})
    }

    getPaymentSelect () {
        const { selectMethod, strings } = this.props
        return (
            <div>
                <Paper onClick={selectMethod} data-method={PAYMENT_METHOD.CASH} zDepth={2} className='item-card'>
                    <h5>{strings.cash}</h5>
                    <i className='fa fa-money payment-glyph' aria-hidden='true' />
                </Paper>
                <Paper onClick={selectMethod} data-method={PAYMENT_METHOD.CREW} zDepth={2} className='item-card'>
                    <h5>{strings.crew}</h5>
                    <i className='fa fa-credit-card payment-glyph' aria-hidden='true' />
                </Paper>
            </div>
        )
    }

    getCrew () {
        const { total, strings, purchaseInProgress } = this.props
        return (
            <div>
                <h3>{strings.scan_to_pay} {total}{strings.price_text}</h3>
                <TextField ref='rfid' id='rfid' type='password' fullWidth hintText={strings.badge_number} onKeyUp={this.onEnter} />
                <RaisedButton onClick={this.purchaseCrew} primary label={strings.purchase} disabled={purchaseInProgress} />
            </div>
        )
    }

    getCash () {
        const { total, strings, purchaseInProgress } = this.props
        return (
            <div>
                <div className='row'>
                    <div className='col-xs-6'>
                        <div className='col-xs-12'>
                            <h3>{strings.please_pay} {total}{strings.price_text}</h3>
                            <TextField ref='amount' id='amount' type='number' fullWidth value={this.state.amount} onChange={this.handleAmountChange} onKeyUp={this.onEnter} hintText={strings.amount_received} />
                        </div>
                        <div className='col-xs-12 last-xs'>
                            <RaisedButton onClick={this.purchaseCash} primary label={strings.purchase} disabled={purchaseInProgress} />
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
            </div>
        )
    }

    getOrderComplete () {
        const { paymentState, strings } = this.props
        const total = this.state.total
        const amount = parseInt(this.state.amount)
        var completeString = ''

        if (paymentState.get('paymentMethod') === PAYMENT_METHOD.CASH) {
            completeString = `${strings.return} ${amount - total} ${strings.price_text}`
        } else if (paymentState.get('paymentMethod') === PAYMENT_METHOD.CREW) {
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

    clear = () => {
        this.refs.amount.value('')
    }

    handleAmountChange = (event) => {
        this.setState({amount: event.target.value})
    }

    numpadClick = (e) => {
        const { strings } = this.props
        if (e.target.innerHTML === strings.back) {
            this.setState({amount: this.state.amount.slice(0, -1)})
        } else {
            this.setState({amount: this.state.amount + e.target.innerHTML})
        }
    }

    billClick = (e) => {
        this.setState({amount: e.target.innerHTML})
    }

    onEnter = (e) => {
        if (e.keyCode === 13) {
            const { paymentState } = this.props
            switch (paymentState.get('paymentMethod')) {
            case PAYMENT_METHOD.CREW:
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
                payment_method: PAYMENT_METHOD.CREW,
                total: total,
                card: value,
                message: '',
                cashier_card: cashierCard
            }
            onPurchase(purchase)
            // eslint-disable-next-line immutable/no-mutation
            this.refs.rfid.value = ''
        }
    }

    purchaseCash = () => {
        const { onPurchase, total, cashierCard } = this.props
        const value = this.refs.amount.getValue()

        // If crew badge is scanned in cash amount field we will get a stupidly high value. Cap at 1000000
        if (parseInt(value) > 1000000) {
            NotificationManager.error('Sales in excess of 1000000 is not supported', '', 3000)
        } else if (value.length > 0 && parseInt(value)) {
            this.setState({total: total})
            const purchase = {
                payment_method: PAYMENT_METHOD.CASH,
                total: total,
                amountReceived: value !== '' ? value : total.toString(),
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
        const paymentMethod = paymentState.get('paymentMethod')
        const stateIndex = paymentState.get('stateIndex')
        const prevStateIndex = prevProps.paymentState.get('stateIndex')

        if (prevStateIndex === stateIndex) {
            return
        }

        if (stateIndex === 1) {
            if (paymentMethod === PAYMENT_METHOD.CREW) {
                setTimeout(() => this.refs.rfid.focus(), 250)
            } else if (paymentMethod === PAYMENT_METHOD.CASH) {
                setTimeout(() => this.refs.amount.focus(), 250)
            }
        } else if (stateIndex === 2) {
            setTimeout(() => this.onClose(), 10000)
        }
    }

    getStepContent (stepIndex, paymentMethod) {
        switch (stepIndex) {
        case 0:
            return this.getPaymentSelect()
        case 1:
            if (paymentMethod === PAYMENT_METHOD.CREW) {
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
        this.setState({amount: ''})
        this.props.onClose()
    }

    render () {
        const { paymentState, onBack, strings } = this.props
        const paymentMethod = paymentState.get('paymentMethod')
        const stateIndex = paymentState.get('stateIndex')

        const actions = [
            <FlatButton
                label={strings.close}
                primary
                onTouchTap={this.onClose}
            />
        ]

        return (
            <Dialog open={paymentState.get('modalOpen')} actions={actions} title={strings.complete_order}>
                <Stepper activeStep={paymentState.get('stateIndex')} linear={false}>
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
        cashierCard: getLoggedInCashier(state).get('card'),
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
