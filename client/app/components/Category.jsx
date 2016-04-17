import React, { PropTypes } from 'react'
var classNames = require('classnames');

const Category = ({ onClick, name, active }) => (
    <a className={classNames({'collection-item': true, 'active': active})} onClick={onClick}>
        {name}
    </a>
);

Category.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
};

export default Category;