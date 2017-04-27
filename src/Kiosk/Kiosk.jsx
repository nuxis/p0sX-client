import React from 'react'
import ItemList from './components/ItemList'
import CategoryList from './components/CategoryList'
import Cart from './components/Cart'

const Kiosk = React.createClass({
    render: function () {
        return (
            <div id='content' className='row pos-container' style={{height: 'calc(100% - 56px)'}}>
                <CategoryList />
                <ItemList />
                <Cart />
            </div>
        )
    }
})

export default Kiosk
