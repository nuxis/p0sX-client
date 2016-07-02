import React, { Component, PropTypes } from 'react'

class CustomerOrder extends Component {

  render() {
    const { orderNumber } = this.props

    return (
      <div>
        {orderNumber}
      </div>
    )
  }
}


CustomerOrder.propTypes = {
  orderNumber: PropTypes.number.isRequired
}


export default CustomerOrder
