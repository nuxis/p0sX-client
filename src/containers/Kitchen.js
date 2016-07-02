import React from 'react'
import VisibleItemList from './VisibleItemList'

const Kitchen = React.createClass({
    render: function () {
        return (
            <div>
                <div id='content' className='row pos-container'>
                    <VisibleItemList />
                </div>
            </div>
        )
    }
})

export default Kitchen

