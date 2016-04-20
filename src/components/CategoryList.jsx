import React from 'react'
import Category from './Category.jsx'

const CategoryList = React.createClass({
    propTypes: {
        categories: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            name: React.PropTypes.string.isRequired
        }).isRequired).isRequired,
        selectedCategory: React.PropTypes.number.isRequired,
        onCategoryClick: React.PropTypes.func.isRequired
    },
    render: function () {
        const {categories, onCategoryClick, selectedCategory} = this.props
        return (
            <div className='col s12 m3 l2'>
                <h4>Categories</h4>
                <div className='collection'>
                    {categories.map((category) =>
                        <Category
                            key={category.id}
                            {...category}
                            active = {selectedCategory === category.id}
                            onClick={() => onCategoryClick(category.id)}
                        />
                    )}
                </div>
            </div>
        )
    }
})

export default CategoryList
