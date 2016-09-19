import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Order from './Order'
import { getOpenOrders } from '../selectors'
import { List } from 'immutable'

class OpenOrders extends Component {

    static propTypes = {
        orders: PropTypes.instanceOf(List).isRequired
    }

    render () {
        const { orders } = this.props
        return (
            <div className="new-orders">
                {orders.map((order) =>
                    <Order order={order} />
                 )}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        orders: getOpenOrders(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenOrders)
