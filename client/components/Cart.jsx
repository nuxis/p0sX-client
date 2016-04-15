import React, { PropTypes } from 'react';
import CartEntry from './CartEntry.jsx';
import CheckoutButton from './CheckoutButton.jsx';

const Cart = ({ items, cart, onEmptyCart, onRemoveItem, onPurchase, total }) => (
    <div className="col s12 m3 l3">
        <h4>
            Cart
            <a className="btn-floating waves-effect waves-light right red" onClick={onEmptyCart}><i className="material-icons">delete</i></a>
        </h4>
        <ul className="collection">
            {cart.map((entry, i) =>
                <CartEntry
                    key={i}
                    {...entry}
                    removeItem={() => onRemoveItem(i)}
                />
            )}
        </ul>
        <CheckoutButton onClick={() => onPurchase()} total={total} />
    </div>
);

Cart.propTypes = {

};

export default Cart;