import React from 'react'
import { connect } from 'react-redux'
import { undoOrder } from '../actions'

class PreviousOrderModal extends React.Component {
    static propTypes = {
        order: React.PropTypes.object.isRequired,
        undoOrder: React.PropTypes.func.isRequired
    }

    render () {
        const { undoOrder, order } = this.props
        return (
            <div id='previous-order-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h4>{order.get('id') === 0 ? 'Nothing to do' : `Order ${order.get('id')}`}</h4>
                    <ul className='collection'>
                    {order.get('lines').map(line =>
                        <li className='collection-item' key={line.get('id')}>
                            <b>{line.get('id')}</b> - {line.get('item').get('name')}
                            {!line.get('ingredients').isEmpty() ? ' with ' : ''}
                            {line.get('ingredients').map(i => i.get('name')).join(', ')}
                        </li>
                    )}
                    </ul>
                </div>
                <div className='modal-footer'>
                    <a href='#!' className='modal-action modal-close waves-effect waves-red btn-flat'>Close</a>
                    <a href='#!' onClick={undoOrder} className='modal-action modal-close waves-effect btn-flat'>Undo</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.lastOrder
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        undoOrder: () => {
            dispatch(undoOrder())
        }
    }
}

export function open () {
    $('#previous-order-modal').openModal()
}

export function close () {
    $('#previous-order-modal').closeModal()
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviousOrderModal)
