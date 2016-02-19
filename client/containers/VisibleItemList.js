import { connect } from 'react-redux';
import { addToCart, setItems } from '../actions';
import ItemList from '../components/ItemList.jsx';

const getVisibleItems = (items, category) => {
    if(category == 0) {
        return items;
    }
    else {
        return items.filter(i => i.category == category);    
    }
}

const mapStateToProps = (state) => {
  return {
    items: getVisibleItems(state.items, state.selectedCategory)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onItemClick: (item) => {
      dispatch(addToCart(item));
    }
  };
};

const VisibleItemList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList)

export default VisibleItemList;