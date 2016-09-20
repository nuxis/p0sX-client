import React from 'react'

class Item extends React.Component {
    static propTypes = {
        onClick: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        image: React.PropTypes.string,
        canHaveIngredients: React.PropTypes.bool.isRequired,
        item: React.PropTypes.object.isRequired
    }

    click () {
        const { onClick, item, canHaveIngredients } = this.props
        onClick(item, canHaveIngredients)
    }

    render () {
        const { name, price, image } = this.props
        return (
            <div className='item-card waves-effect z-depth-1 hoverable' onClick={::this.click}>
                <img src={image} />
                <div className='name-truncate'>{name}</div>
                <div className='price grey-text text-darken-1'>{price} Kr.</div>
            </div>
        )
    }
}

export default Item
