import React from 'react'
import { connect } from 'react-redux'
import { cashierLogin } from '../actions'

class LockModal extends React.Component {
    static propTypes = {
        authenticateCrew: React.PropTypes.func.isRequired
    }

    keyPress = (e) => {
        const { authenticateCrew } = this.props
        if (e.keyCode === 13) {
            const card = $('#cardid').val()
            $('#cardid').val('')
            authenticateCrew(card)
        }
    }

    focus = () => {
        $('#cardid').focus()
    }

    render () {
        return (
            <div id='lock-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h4>Scan card to unlock</h4>
                    <div className='input-field col s12'>
                        <input id='cardid' type='password' className='validate' onBlur={this.focus} onKeyUp={this.keyPress} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticateCrew: (card) => {
            dispatch(cashierLogin(card))
        }
    }
}

const open = () => {
    // eslint-disable-next-line no-undef
    $('#lock-modal').openModal({dismissible: false})
    $('#cardid').focus()
}

const close = () => {
    // eslint-disable-next-line no-undef
    $('#lock-modal').closeModal()
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LockModal)

export {
    open,
    close
}
