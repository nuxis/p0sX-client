import React, { Component, PropTypes } from 'react'

class CustomerOrder extends Component {
    static propTypes = {
        orderNumber: PropTypes.number.isRequired
    }

    render () {
        const { orderNumber } = this.props

        return (
            <div>
                {orderNumber}
            </div>
        )
    }
}

export default CustomerOrder

