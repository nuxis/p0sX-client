import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setActiveCategory } from '../actions'
import { getCategories, getSelectedCategory } from '../selectors'
import {List, ListItem, makeSelectable} from 'material-ui/List'
import Divider from 'material-ui/Divider'

const SelectableList = makeSelectable(List)

class CategoryList extends React.Component {
    static propTypes = {
        categories: PropTypes.array,
        onCategoryClick: PropTypes.func,
        selectedCategory: PropTypes.number
    }

    handleSelectionChange = (event, value) => {
        const {onCategoryClick, categories} = this.props
        onCategoryClick(categories.find(c => c.id === value))
    }

    render () {
        const {categories, selectedCategory} = this.props
        return (
            <div className='categories'>
                <SelectableList value={selectedCategory} onChange={this.handleSelectionChange}>
                    {categories.map((category) =>
                        [
                            <ListItem
                                key={category.id}
                                primaryText={category.name}
                                value={category.id}
                            />,
                            <Divider />
                        ]
                    )}
                </SelectableList>
            </div>
        )
    }
}

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
