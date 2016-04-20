import React from 'react'

const Item = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        stock: React.PropTypes.number.isRequired
    },
    render: function () {
        const { onClick, name, price } = this.props
        return (
            <div className='item-card waves-effect waves-green z-depth-1 hoverable' onClick={onClick}>
                <div className='card-image'>
                    <img src='http://placehold.it/120x120'/>
                </div>
                <div className='name-truncate'>{name}</div>
                <div className='price grey-text'>{price} Kr.</div>
            </div>
        )
    }
})

export default Item
