import React, { PropTypes } from 'react'

const Item = ({ onClick, name, price, stock }) => (
    <div className="item-card waves-effect waves-green z-depth-1 hoverable" onClick={onClick}>
        <div className="card-image">
            <img src="http://placehold.it/150x150"/>
        </div>
        <span className="name-truncate">{name}</span>
        <span className="right price grey-text">{price} Kr.</span>
    </div>
);

Item.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired
};

export default Item;