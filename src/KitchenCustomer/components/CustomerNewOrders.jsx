import React, { Component, PropTypes } from 'react'
import CustomerOrder from './CustomerOrder.jsx'
import { getOpenOrders } from '../backend.js'

class CustomerOrder extends Component {

  render() {
    const { orders } = this.props

    return (
      <div className="new-orders">
        {orders.map((order) => 
            <CustomerOrder orderNumber={order.id}/>
          )}
      </div>
    )
  }

}

CustomerNewOrders.propTypes {
  orders = PropTypes.List.isRequired
}


export default CustomerNewOrders
