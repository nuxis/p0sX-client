import React from 'react'
import { connect } from 'react-redux'
import { createNewShift } from '../actions'
import { getShift } from '../selectors'
import { Map } from 'immutable'

class ShiftModal extends React.Component {
    static propTypes = {
        shift: React.PropTypes.instanceOf(Map).isRequired,
        newShift: React.PropTypes.func.isRequired
    }

    render () {
        const {shift, newShift} = this.props
        return (
            <div id='shift-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h3>Shift</h3>
                    <h6>Started: {new Date(shift.get('start')).toString()}</h6>
                    <table>
                        <tbody>
                            <tr>
                                <td>Cash</td>
                                <td>{shift.get('cash')}</td>
                            </tr>
                            <tr>
                                <td>Crew</td>
                                <td>{shift.get('crew')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='modal-footer'>
                    <a className='btn-flat waves-effect waves-light left' onClick={newShift}>
                        New Shift
                    </a>
                    <a className='btn-flat waves-effect waves-light' onClick={close}>
                        Close
                    </a>
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
        newShift: () => {
            if (confirm('Are you sure you want to create a new shift?')){
                dispatch(createNewShift())
            }
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
