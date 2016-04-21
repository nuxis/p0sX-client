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
                <img src='http://placehold.it/120x120' alt='' className='circle' />
                <span className='title'>{name} {ingredients.length ? 'med' : ''}</span>
                <p>
                    {ingredients.map((ingredient, i) =>
                        <span key={ingredient.id}>{ingredient.name}{i < ingredients.length - 1 ? ', ' : <br />}</span>
                    )}
                    {price} Kr.
                </p>
                <a href='#!' style={{marginRight: '-15px'}} className='secondary-content' onClick={removeItem}><i className='material-icons small red-text'>delete</i></a>
            </li>
        )
    }
})

export default CartEntry
