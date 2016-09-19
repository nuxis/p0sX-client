import React from 'react'
import OrderLineIngredient from './OrderLineIngredient'

export default (props) => {
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