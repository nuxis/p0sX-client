import { connect } from 'react-redux';
import { emptyCart, removeItem } from '../actions';
import Cart from '../components/Cart.jsx';

const itemById = (items, id) => {
    var f = null;
    items.forEach(i => {
        if(i.id == id)
            f = i;
    });
    return f;
};

const getVisibleItems = (items, cart) => {
    return cart.map(entry => {
        return Object.assign(entry, itemById(items, entry.id));
    });
};

const getTotalPrice = (items, cart) => {
    return cart.reduce((total, entry) => {
        return total + itemById(items, entry.id).price;
    }, 0);
};

const mapStateToProps = (state) => {
    return {
        items: getVisibleItems(state.items, state.cart),
        cart: state.cart,
        total: getTotalPrice(state.items, state.cart)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEmptyCart: () => {
            dispatch(emptyCart());
        },
        onRemoveItem: (item) => {
           dispatch(removeItem(item));
        },
        onPurchase: () => {
            console.log("Purchase");
        }
    };
};

const VisibleCartList = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);

export default VisibleCartList;