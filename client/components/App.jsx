import React from 'react'
import VisibleItemList from '../containers/VisibleItemList'
import CategoryContainer from '../containers/CategoryContainer'
import VisibleCartList from '../containers/VisibleCartList';
import {Navbar} from 'react-materialize';
import IngredientModal from './Modal.jsx';

const App = () => (
    <div>
        <Navbar brand='p0sX' right />
        <IngredientModal id="ingredient-modal" />
        <div id="content" className="row pos-container">
            <CategoryContainer />
            <VisibleItemList />
            <VisibleCartList />
        </div>
    </div>
);

export default App;