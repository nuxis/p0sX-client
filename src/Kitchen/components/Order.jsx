import React, { Component, PropTypes } from 'react'
import { Map } from 'immutable'
import classNames from 'classnames'
import OrderLine from './OrderLine'


class CustomerOrder extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Map).isRequired
    }

    render () {
        const { order } = this.props
        console.log('rendering order')
        return (
            <div className='order'>
                <h1>{order.get('id')}</h1>
                <ul>
                {order.get('orderlines').map((orderline) =>
                    <OrderLine
                        key={orderline.get('id')}
                        item={orderline.get('item')}
                        ingredients={orderline.get('ingredients')}
                    />
                )}
                </ul>
            </div>
        )
    }
}

export default CustomerOrder
