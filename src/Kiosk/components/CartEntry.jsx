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

    removeItem = () => {
        const { onRemoveItem, index } = this.props
        onRemoveItem(index)
    }

    render () {
        const { name, price, ingredients, image } = this.props
        return (
            <li className='collection-item avatar'>
                <img src={image} alt='' className='circle' />
                <span className='title'>{name}</span>
                <p>
                    <span>{ingredients.map(i => i.get('name')).join(', ')}</span>
                    {!ingredients.isEmpty() ? <br /> : ''}
                    {price} Kr.
                </p>
                <a style={{marginRight: '-15px'}} className='secondary-content' onClick={this.removeItem} title='Remove item'>
                    <i className='material-icons small red-text'>delete</i>
                </a>
            </li>
        )
    }
}

export default CartEntry
