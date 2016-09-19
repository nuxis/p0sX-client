import React from 'react'
import { Map } from 'immutable'

const OrderLineIngredient = (props) => {
    const {ingredient} = props

    return (
        <li>{ingredient.get('name')}</li>
    )
}

OrderLineIngredient.propTypes = {
    ingredient: React.PropTypes.instanceOf(Map).isRequired
}

export default OrderLineIngredient
