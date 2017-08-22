import React from 'react'
import ItemList from './components/ItemList'
import CategoryList from './components/CategoryList'
import Cart from './components/Cart'

function Kiosk () {
    return (
        <div className='wrapper'>
            <CategoryList />
            <ItemList />
            <Cart />
        </div>
    )
}

export default Kiosk
