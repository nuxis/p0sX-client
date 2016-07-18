import React from 'react'
import OpenOrders from './components/OpenOrders'

const Kiosk = React.createClass({
    render: function () {
        return (
            <div>
                <div id='content' className='row pos-container'>
                    <OpenOrders />
                </div>
            </div>
        )
    }
})

export default Kiosk
