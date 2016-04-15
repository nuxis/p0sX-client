import React, { PropTypes, Component } from 'react';
import Category from './Category.jsx';
import IngredientModal from './Modal.jsx';

export default class CategoryList extends Component {
    render() {
        const {categories, onCategoryClick, selectedCategory} = this.props;     
        return (
            <div className="col s12 m3 l2">
                <h4>Categories</h4>
                <div className="collection">
                    {categories.map(category =>
                        <Category
                            key={category.id}
                            {...category}
                            active = {selectedCategory==category.id}
                            onClick={() => onCategoryClick(category.id)}
                        />
                    )}
                </div>
            </div>
        )
    }  
}

CategoryList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    selectedCategory: PropTypes.number.isRequired,
    onCategoryClick: PropTypes.func.isRequired
};