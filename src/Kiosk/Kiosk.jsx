import React from 'react'
import ItemList from './components/ItemList'
import CategoryList from './components/CategoryList'
import Cart from './components/Cart'

function Kiosk () {
    return (
        <div id='content' className='row pos-container'>
            <CategoryList />
            <ItemList />
            <Cart />
        </div>
    )
}

export default Kiosk
