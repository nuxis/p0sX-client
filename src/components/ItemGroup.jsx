import React from 'react'
import Item from './Item.jsx'

const ItemGroup = React.createClass({
    propTypes: {
        category: React.PropTypes.string.isRequired,
        items: React.PropTypes.array.isRequired,
        onItemClick: React.PropTypes.func.isRequired
    },
    render: function () {
        const { items, category, onItemClick } = this.props
        return (
            <div>
                <h5>{category}</h5>
                {items.map((item) =>
                    <Item
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        image={item.image || './static/planet.png'}
                        // eslint-disable-next-line camelcase
                        onClick={() => onItemClick(item.id, item.can_have_ingredients)}
                    />
                )}
            </div>
        )
    }
})

export default ItemGroup