import React, { PropTypes, Component } from 'react';
import Category from './Category.jsx';
import axios from 'axios';
import IngredientModal from './IngredientModal.jsx';

export default class CategoryList extends Component {  
    componentDidMount() {
        var callback = this.props.onAddCategories;
        axios.get('http://127.0.0.1:8000/categories/?format=json')
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (response) {
            console.log(response);
        });
    }

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
        name: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    selectedCategory: PropTypes.number.isRequired,
    onCategoryClick: PropTypes.func.isRequired
};