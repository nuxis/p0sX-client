import React from 'react'
import { connect } from 'react-redux'
import { createNewShift, setShiftModalOpen } from '../actions'
import { getShift, getLoggedInCashier, getStrings } from '../selectors'
import { Map } from 'immutable'
// import printShift from '../../common/print-shift'
// import settings from '../../common/settings'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'

class ShiftModal extends React.Component {
    static propTypes = {
        shift: React.PropTypes.instanceOf(Map),
        dispatchCreateNewShift: React.PropTypes.func,
        card: React.PropTypes.string,
        closeModal: React.PropTypes.func,
        strings: React.PropTypes.object
    }

    newShift = () => {
        // const { shift } = this.props
        // const printerSettings = settings.get('receiptPrinter')
        // printShift(printerSettings.type, printerSettings.config, shift, settings.get('name'))
        const {dispatchCreateNewShift, card} = this.props
        dispatchCreateNewShift({card: card})
    }

    render () {
        const { shift, strings, closeModal } = this.props

        const actions = [
            <FlatButton
                label={strings.new_shift}
                primary
                onTouchTap={this.newShift}
            />,
            <FlatButton
                label={strings.close}
                primary
                onTouchTap={closeModal}
            />
        ]

        return (
            <Dialog
                title={strings.manage_shifts}
                actions={actions}
                modal={false}
                open={shift.get('modalOpen')}
                onRequestClose={closeModal}
            >
                <h4>{strings.started}: {new Date(shift.get('start')).toString()}</h4>
                <Table>
                    <TableBody displayRowCheckbox={false} showRowHover={false} >
                        <TableRow selectable={false}>
                            <TableRowColumn>{strings.cash}</TableRowColumn>
                            <TableRowColumn>{shift.get('cash')}</TableRowColumn>
                        </TableRow>
                        <TableRow selectable={false}>
                            <TableRowColumn>{strings.crew}</TableRowColumn>
                            <TableRowColumn>{shift.get('crew')}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        shift: getShift(state),
        card: getLoggedInCashier(state).get('card'),
        strings: getStrings(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchCreateNewShift: (payload) => {
            if (confirm('Are you sure you want to create a new shift?')) {
                dispatch(createNewShift(payload))
            }
        },
        closeModal: () => dispatch(setShiftModalOpen(false))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShiftModal)

export {
    open,
    close
}
