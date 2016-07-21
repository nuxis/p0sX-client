import React from 'react'

const Item = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        image: React.PropTypes.string
    },
    render: function () {
        const { onClick, name, price, image } = this.props
        return (
            <div className='item-card waves-effect z-depth-1 hoverable' onClick={onClick}>
                <img src={image} />
                <div className='name-truncate'>{name}</div>
                <div className='price grey-text text-darken-1'>{price} Kr.</div>
            </div>
        )
    }
})

export default Item
