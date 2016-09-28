import React from 'react'
import { connect } from 'react-redux'
import { cashierLogin } from '../actions'
import { getShift } from '../selectors'
import { Map } from 'immutable'

class ShiftModal extends React.Component {
    static propTypes = {
        shift: React.PropTypes.instanceOf(Map).isRequired
    }

    render () {
        return (
            <div id='shift-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h3>Shift</h3>
                    <h6>Started: {new Date(this.props.shift.get('start')).toString()}</h6>
                    <table>
                        <tbody>
                            <tr>
                                <td>Cash</td>
                                <td>{this.props.shift.get('cash')}</td>
                            </tr>
                            <tr>
                                <td>Crew</td>
                                <td>{this.props.shift.get('crew')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shift: getShift(state)
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
