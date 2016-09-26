import React from 'react'
import { connect } from 'react-redux'
import { cashierLogin } from '../action'

class LockModal extends React.Component {
    static propTypes = {
        authenticateCrew: React.PropTypes.func.isRequired
    }

    keyPress (e) {
        const { authenticateCrew } = this.props
        if (e.keyCode === 13) {
            const card = $('#cardid').val()
            $('#cardid').val('')
            authenticateCrew(card)
        }
    }

    render () {
        return (
            <div id='lock-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h4>Scan card to unlock</h4>
                    <div className='input-field col s12'>
                        <input id='cardid' type='hidden' className='validate' />
                    </div>
                </div>
                <div className='modal-footer'>
                    <a href='#!' onClick={this.onClick} className='modal-action modal-close waves-effect waves-green btn-flat'>Save</a>
                    <a href='#!' className='modal-action modal-close waves-effect waves-red btn-flat'>Cancel</a>
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
    Materialize.updateTextFields()
    $('#lock-modal').openModal()
}

const close = () => {
    // eslint-disable-next-line no-undef
    Materialize.updateTextFields()
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
