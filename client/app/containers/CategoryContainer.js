import { connect } from 'react-redux';
import { setActiveCategory } from '../actions';
import CategoryList from '../components/CategoryList.jsx';


const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    selectedCategory: state.selectedCategory
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCategoryClick: (category) => {
        dispatch(setActiveCategory(category))
    }
  };
};

const CategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);

export default CategoryContainer;