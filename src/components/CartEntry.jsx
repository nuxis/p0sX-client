import React from 'react'

const CartEntry = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        ingredients: React.PropTypes.array.isRequired,
        removeItem: React.PropTypes.func.isRequired
    },
    render: function () {
        const { name, price, ingredients, removeItem } = this.props
        return (
            <li className='collection-item avatar'>
                <img src='http://placehold.it/150x150' alt='' className='circle' />
                <span className='title'>{name}</span>
                <p>
                    {price} Kr.<br />
                    {ingredients.length ? 'Med ' : ''}
                    {ingredients.map((ingredient, i) =>
                        <span key={ingredient.id}>{ingredient.name}{i < ingredients.length - 1 ? ', ' : ''}</span>
                    )}
                </p>
                <a href='#!' style={{marginRight: '-15px'}} className='secondary-content' onClick={removeItem}><i className='material-icons small red-text'>delete</i></a>
            </li>
        )
    }
})

export default CartEntry
