import React, { PropTypes } from 'react'

const CartEntry = ({ name, price, ingredients, removeItem }) => (
    <li className="collection-item avatar">
        <img src="http://placehold.it/150x150" alt="" className="circle" />
        <span className="title">{name} {price} Kr.</span>
        <p>
            {ingredients.length?<span>Med </span>:""}
            {ingredients.map((ingredient, i) =>
                <span key={ingredient.id}>{ingredient.name}{i < ingredients.length - 1?", ":""}</span>
            )}
        </p>
        <a href="#!" className="secondary-content" onClick={removeItem}><i className="material-icons small red-text">delete</i></a>
    </li>
);

CartEntry.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

export default CartEntry;