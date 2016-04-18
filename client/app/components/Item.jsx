import React from 'react'

const Item = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        stock: React.PropTypes.number.isRequired
    },
    render: function () {
        const { onClick, name, price, stock } = this.props
        return (
            <div className='item-card waves-effect waves-green z-depth-1 hoverable' onClick={onClick}>
                <div className='card-image'>
                    <img src='http://placehold.it/150x150'/>
                </div>
                <span className='name-truncate'>{name}</span>
                <span className='right price grey-text'>{price} Kr.</span>
            </div>
        )
    }
})

export default Item
