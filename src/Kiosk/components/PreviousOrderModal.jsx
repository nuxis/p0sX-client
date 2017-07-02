import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { undoOrder, setLastOrderModalOpen } from '../actions'
import { getStrings } from '../selectors'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {List, ListItem} from 'material-ui/List'

class PreviousOrderModal extends React.Component {
    static propTypes = {
        order: PropTypes.object,
        undoOrder: PropTypes.func,
        strings: PropTypes.object,
        close: PropTypes.func
    }

    render () {
        const { order, strings, undoOrder, close } = this.props

        const actions = [
            <FlatButton
                label={strings.undo}
                primary
                disabled={order.id === 0}
                onTouchTap={undoOrder}
            />,
            <FlatButton
                label={strings.close}
                primary
                onTouchTap={close}
            />
        ]

        return (
            <Dialog
                title={order.id === 0 ? strings.no_previous_order : `${strings.order} ${order.id}`}
                actions={actions}
                modal={false}
                open={order.open}
                onRequestClose={close}
            >
                <List>
                    {order.lines.map(line =>
                        <ListItem key={line.id}>
                            <b>{line.id}</b> - {line.item.name}
                            {!line.ingredients.length === 0 ? ' with ' : ''}
                            {line.ingredients.map(i => i.name).join(', ')}
                        </ListItem>
                    )}
                </List>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.lastOrder,
        strings: getStrings(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        undoOrder: () => dispatch(undoOrder()),
        close: () => dispatch(setLastOrderModalOpen(false))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviousOrderModal)
