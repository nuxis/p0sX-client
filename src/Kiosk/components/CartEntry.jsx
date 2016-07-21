import React from 'react'
import { List } from 'immutable'

class CartEntry extends React.Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        ingredients: React.PropTypes.instanceOf(List).isRequired,
        onRemoveItem: React.PropTypes.func.isRequired,
        image: React.PropTypes.string,
        index: React.PropTypes.number.isRequired
    }

    removeItem () {
        const { onRemoveItem, index } = this.props
        onRemoveItem(index)
    }

    render () {
        const { name, price, ingredients, image } = this.props
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
                <a href='#!' style={{marginRight: '-15px'}} className='secondary-content' onClick={::this.removeItem} title='Remove item'>
                    <i className='material-icons small red-text'>delete</i>
                </a>
            </li>
        )
    }
}

export default CartEntry
