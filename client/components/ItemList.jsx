import React, { PropTypes } from 'react';
import Item from './Item.jsx';

const ItemList = ({ items, onItemClick }) => (
  <div  className="col s12 m6 l7">
    <h4>Items</h4>
    <div>
        {items.map(item =>
        <Item
            key={item.id}
            {...item}
            onClick={() => onItemClick(item.id)}
        />
        )}
    </div>
  </div>
);

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        barcode: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
        category: PropTypes.number.isRequired,
        can_have_ingredients: PropTypes.bool.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired).isRequired,
    onItemClick: PropTypes.func.isRequired
};

export default ItemList;