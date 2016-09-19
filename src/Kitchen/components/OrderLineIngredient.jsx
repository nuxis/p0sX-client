import React from 'react'

export default (props) => {
    const {ingredient} = props

    return (
        <li>{ingredient.get('name')}</li>
    )
}