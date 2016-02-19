import React, { PropTypes } from 'react'

const Item = ({ onClick, name, price, stock }) => (
    <div className="item-card waves-effect waves-green z-depth-1 hoverable" onClick={onClick}>
        <div className="card-image">
        <img src="http://placehold.it/150x150"/>
        </div>
        <div className="name-truncate">{name}</div>
        <span className="right grey-text">{price} Kr.</span>
        <br />
        Stock: {stock} left
    </div>
);

Item.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired
};

export default Item;