import React from 'react'
import Category from './Category.jsx'
import { connect } from 'react-redux'
import { setActiveCategory } from '../actions'
import { getCategories, getSelectedCategory } from '../selectors'
import { List } from 'immutable'

const CategoryList = React.createClass({
    propTypes: {
        categories: React.PropTypes.instanceOf(List).isRequired,
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
                            active={selectedCategory === category.get('id')}
                            onClick={() => onCategoryClick(category)}
                        />
                    )}
                </div>
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    return {
        categories: getCategories(state),
        selectedCategory: getSelectedCategory(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCategoryClick: (category) => {
            dispatch(setActiveCategory(category))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
