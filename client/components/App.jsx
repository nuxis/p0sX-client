import React from 'react'
import VisibleItemList from '../containers/VisibleItemList'
import CategoryContainer from '../containers/CategoryContainer'
import Cart from '../components/Cart.jsx';
import {Navbar, NavItem} from 'react-materialize';

const App = () => (
    <div>
        <Navbar brand='p0sX' right>
        </Navbar>
        <div id="content" className="row pos-container">
            <CategoryContainer />
            <VisibleItemList />
            <Cart />
        </div>
    </div>
);

export default App;