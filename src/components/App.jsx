import React from 'react'
import VisibleItemList from '../containers/VisibleItemList'
import CategoryContainer from '../containers/CategoryContainer'
import VisibleCartList from '../containers/VisibleCartList'
import {Navbar} from 'react-materialize'
import IngredientModal from './IngredientModal.jsx'

const App = React.createClass({
    propTypes: {},
    render: () => (
        <div>
            <Navbar brand='p0sX' right />
            <div id='content' className='row pos-container'>
                <CategoryContainer />
                <VisibleItemList />
                <VisibleCartList />
            </div>
            <IngredientModal />
        </div>
    )
})

export default App
