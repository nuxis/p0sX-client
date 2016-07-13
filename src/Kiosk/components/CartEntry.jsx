import React from 'react'

const CartEntry = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        ingredients: React.PropTypes.array.isRequired,
        removeItem: React.PropTypes.func.isRequired,
        image: React.PropTypes.string
    },
    render: function () {
        const { name, price, ingredients, removeItem, image } = this.props
        return (
            <li className='collection-item avatar'>
                <img src={image} alt='' className='circle' />
                <span className='title'>{name} {ingredients.size ? 'med' : ''}</span>
                <p>
                    {ingredients.map((ingredient, i) =>
                        <span key={ingredient.get('id')}>{ingredient.get('name')}{i < ingredients.size - 1 ? ', ' : <br />}</span>
                    )}
                    {price} Kr.
                </p>
                <a href='#!' style={{marginRight: '-15px'}} className='secondary-content' onClick={removeItem} title='Remove item'>
                    <i className='material-icons small red-text'>delete</i>
                </a>
            </li>
        )
    }
})

export default CartEntry
