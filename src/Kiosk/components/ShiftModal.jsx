import React from 'react'
import { connect } from 'react-redux'
import { createNewShift, setShiftModalOpen } from '../actions'
import { getShift, getLoggedInCashier, getStrings, getSettings } from '../selectors'
import { Map } from 'immutable'
import { printShift } from '../../common/print'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import moment from 'moment'

class ShiftModal extends React.Component {
    static propTypes = {
        shift: React.PropTypes.instanceOf(Map),
        dispatchCreateNewShift: React.PropTypes.func,
        card: React.PropTypes.string,
        closeModal: React.PropTypes.func,
        strings: React.PropTypes.object
    }

    newShift = () => {
        const {dispatchCreateNewShift, card, strings} = this.props
        if (confirm(strings.confirm_new_shift)) {
            dispatchCreateNewShift({card: card})
        }
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
                <h4>{strings.started}: {moment(new Date(shift.get('start'))).format('DD.MM.YYYY HH:mm:ss')}</h4>
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
        dispatchCreateNewShift: (payload) => dispatch(createNewShift(payload)),
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
