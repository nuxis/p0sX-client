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
        console.log('CATEHORYLIST: ', categories)
        return (
            <div className='col s12 m3 l2'>
                <div className='collection'>
                    {categories.map((category) =>
                        <Category
                            key={category.get('id')}
                            name={category.get('name')}
                            active = {selectedCategory === category.get('id')}
                            onClick={() => onCategoryClick(category.get('id'))}
                        />
                    )}
                </div>
            </div>
        )
    }
})

export default CategoryList
