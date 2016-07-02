import React from 'react'
import VisibleItemList from './VisibleItemList'
import CategoryContainer from './CategoryContainer'
import VisibleCartList from '../containers/VisibleCartList'

const Kiosk = React.createClass({
    render: function () {
        return (
            <div>
                <div id='content' className='row pos-container'>
                    <CategoryContainer />
                    <VisibleItemList />
                    <VisibleCartList />
                </div>
            </div>
        )
    }
})

export default Kiosk

