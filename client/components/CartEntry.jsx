import React, { PropTypes } from 'react'

const CartEntry = ({ name, price, stock, count, ingredients, removeItem }) => (
    <li className="collection-item avatar">
        <img src="http://placehold.it/150x150" alt="" className="circle" />
        <span className="title">{name} x{count}</span>
        <p>
            {price * count} Kr.
        </p>
        <a href="#!" className="secondary-content" onClick={removeItem}><i className="material-icons small red-text">delete</i></a>
    </li>
);

CartEntry.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired
};

export default CartEntry;