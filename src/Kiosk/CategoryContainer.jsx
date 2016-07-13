import { connect } from 'react-redux'
import { setActiveCategory } from './actions'
import CategoryList from './components/CategoryList.jsx'
import { getCategories, getSelectedCategory } from './selectors'

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

const CategoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList)

export default CategoryContainer
