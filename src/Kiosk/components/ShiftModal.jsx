import React from 'react'
import { connect } from 'react-redux'
import { cashierLogin } from '../actions'

class ShiftModal extends React.Component {
    static propTypes = {
        authenticateCrew: React.PropTypes.func.isRequired
    }

    render () {
        return (
            <div id='shift-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    Hello
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
    $('#shift-modal').openModal()
}

const close = () => {
    // eslint-disable-next-line no-undef
    $('#shift-modal').closeModal()
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShiftModal)

export {
    open,
    close
}
