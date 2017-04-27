import React from 'react'
import { connect } from 'react-redux'
import { getCreditForCrew, setCreditModalOpen } from '../actions'
import { getStrings } from '../selectors'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

class PreviousOrderModal extends React.Component {
    static propTypes = {
        credit: React.PropTypes.object,
        checkCredit: React.PropTypes.func,
        strings: React.PropTypes.object,
        closeModal: React.PropTypes.func
    }

    focusTextField = () => this.refs.creditBadge.focus()

    componentDidUpdate (prevProps) {
        const open = this.props.credit.get('modalOpen')
        const prevOpen = prevProps.credit.get('modalOpen')

        if (open && open !== prevOpen) {
            setTimeout(() => this.focusTextField(), 250)
        }
    }

    onEnter = (e) => {
        const { checkCredit } = this.props
        const value = this.refs.creditBadge.getValue()

        if (e.keyCode === 13) {
            checkCredit(value)
            this.refs.creditBadge.input.value = ''
        }
    }

    onBlur = () => {
        this.refs.creditBadge.focus()
    }

    render () {
        const { credit, strings, closeModal } = this.props

        const actions = [
            <FlatButton
                label={strings.close}
                primary
                onTouchTap={closeModal}
            />
        ]

        return (
            <Dialog
                title={strings.scan_badge_to_check_credit}
                actions={actions}
                modal={false}
                open={credit.get('modalOpen')}
                onRequestClose={closeModal}
            >
                <div className='row'>
                    <div className='col-xs-12'>
                        <h4>{strings.this_person_has} <b>{credit.get('left')}{strings.price_short}</b> {strings.of} {credit.get('credit_limit')}{strings.price_short} {strings.remaining}</h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-12'>
                        <TextField onKeyUp={this.onEnter} type='password' fullWidth onBlur={this.onBlur} ref='creditBadge' id='credit-badge' />
                    </div>
                </div>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        credit: state.creditCheck,
        strings: getStrings(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkCredit: (badge) => dispatch(getCreditForCrew(badge)),
        closeModal: () => dispatch(setCreditModalOpen(false))
    }
}

export function open () {
    $('#credit-check-modal').openModal()
    $('#credit-badge').focus()
}

export function close () {
    $('#credit-check-modal').closeModal()
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviousOrderModal)
