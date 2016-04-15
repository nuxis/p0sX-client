import { connect } from 'react-redux';
import { emptyCart, removeItem } from '../actions';
import Cart from '../components/Cart.jsx';

const getVisibleItems = (items, cart) => {
    return items.filter(i => {
        return cart.addedIds.indexOf(i.id) != -1 && cart.quantityById[i.id] > 0;
    });
};

const getTotalPrice = (items, cart) => {
    var total = 0;
    items.forEach(i => {
        if(cart.addedIds.indexOf[i.id] != -1 && cart.quantityById[i.id]) {
            total += i.price * cart.quantityById[i.id];
        }
    });
    return total;
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