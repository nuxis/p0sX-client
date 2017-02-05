import React from 'react'
import { connect } from 'react-redux'
import { createNewShift, setShiftModalOpen } from '../actions'
import { getShift, getLoggedInCashier, getStrings, getSettings } from '../selectors'
import { Map } from 'immutable'
import { printShift } from '../../common/print'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'

class ShiftModal extends React.Component {
    static propTypes = {
        shift: React.PropTypes.instanceOf(Map),
        dispatchCreateNewShift: React.PropTypes.func,
        card: React.PropTypes.string,
        closeModal: React.PropTypes.func,
        strings: React.PropTypes.object,
        printShift: React.PropTypes.func
    }

    newShift = () => {
        const {dispatchCreateNewShift, card, printShift, shift} = this.props
        dispatchCreateNewShift({card: card})
        printShift(shift)
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
        strings: getStrings(state),
        printShift: (shift) => {
            const { receiptPrinter, name } = getSettings(state)
            printShift(receiptPrinter.type, receiptPrinter.config, shift, name).then(() => {})
        }
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
