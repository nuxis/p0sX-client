import React, { PropTypes, Component } from 'react';
import { setItemsAsync } from '../actions';
import Item from './Item.jsx';

class ItemList extends Component {

    componentDidMount() {
        this.props.getInitialData();
    }

    render() {
        const { items, onItemClick } = this.props;

        return (
            <div  className="col s12 m6 l7">
                <h4>Items</h4>
                <div>
                    {items.map(item =>
                        <Item
                            key={item.id}
                            {...item}
                            onClick={() => onItemClick(item.id, item.can_have_ingredients)}
                        />
                    )}
                </div>
            </div>
        )
    }
}

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