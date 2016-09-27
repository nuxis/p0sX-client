import React from 'react'
import { connect } from 'react-redux'
import { getCreditForCrew } from '../actions'

class PreviousOrderModal extends React.Component {
    static propTypes = {
        credit: React.PropTypes.object.isRequired,
        checkCredit: React.PropTypes.func.isRequired
    }

    onEnter (e) {
        const { checkCredit } = this.props
        const { value } = this.refs.creditBadge
        if (e.keyCode === 13) {
            checkCredit(value)
            // eslint-disable-next-line immutable/no-mutation
            this.refs.creditBadge.value = ''
        }
    }

    onBlur () {
        this.refs.creditBadge.focus()
    }

    render () {
        const { credit } = this.props
        return (
            <div id='credit-check-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h4>Scan badge to check credit</h4>
                    <div className='row'>
                        <div className='col s12'>
                            <h5>This person has <b>{credit.get('left')},-</b> of {credit.get('credit_limit')},- left</h5>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s12' style={{opacity: '0'}}>
                            <input onKeyUp={::this.onEnter} onBlur={::this.onBlur} ref='creditBadge' type='text' id='credit-badge' required className='validate' />
                        </div>
                    </div>
                </div>
                <div className='modal-footer'>
                    <a href='#!' className='modal-action modal-close waves-effect waves-red btn-flat'>Close</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        credit: state.creditCheck
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkCredit: (badge) => {
            dispatch(getCreditForCrew(badge))
        }
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
