import React from 'react'
import { connect } from 'react-redux'
import { undoOrder, setLastOrderModalOpen } from '../actions'
import { getStrings } from '../selectors'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {List, ListItem} from 'material-ui/List'

class PreviousOrderModal extends React.Component {
    static propTypes = {
        order: React.PropTypes.object,
        undoOrder: React.PropTypes.func,
        strings: React.PropTypes.object,
        close: React.PropTypes.func
    }

    render () {
        const { order, strings, undoOrder, close } = this.props

        const actions = [
            <FlatButton
                label={strings.undo}
                primary
                disabled={order.get('id') === 0}
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
                title={order.get('id') === 0 ? strings.no_previous_order : `${strings.order} ${order.get('id')}`}
                actions={actions}
                modal={false}
                open={order.get('open')}
                onRequestClose={close}
            >
                <List>
                    {order.get('lines').map(line =>
                        <ListItem key={line.get('id')}>
                            <b>{line.get('id')}</b> - {line.get('item').get('name')}
                            {!line.get('ingredients').isEmpty() ? ' with ' : ''}
                            {line.get('ingredients').map(i => i.get('name')).join(', ')}
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
