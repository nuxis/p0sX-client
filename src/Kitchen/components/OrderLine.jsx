import React from 'react'
import OrderLineIngredient from './OrderLineIngredient'
import { List, Map } from 'immutable'

const OrderLine = (props) => {
    const {item, ingredients} = props

    return (
        <li>{item.get('name')}
            <ul>
                {ingredients.map((ingredient) =>
                    <OrderLineIngredient
                        ingredient={ingredient}
                    />
                )}
            </ul>
        </li>
    )
}

OrderLine.propTypes = {
    item: React.PropTypes.instanceOf(Map).isRequired,
    ingredients: React.PropTypes.instanceOf(List).isRequired
}

export default OrderLine
