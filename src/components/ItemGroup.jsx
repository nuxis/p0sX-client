import React from 'react'
import Item from './Item.jsx'

const ItemGroup = React.createClass({
    propTypes: {
        category: React.PropTypes.string.isRequired,
        items: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            name: React.PropTypes.string.isRequired,
            barcode: React.PropTypes.string.isRequired,
            stock: React.PropTypes.number.isRequired,
            category: React.PropTypes.number.isRequired,
            // eslint-disable-next-line camelcase
            can_have_ingredients: React.PropTypes.bool.isRequired,
            price: React.PropTypes.number.isRequired,
            image: React.PropTypes.string
        }).isRequired).isRequired,
        onItemClick: React.PropTypes.func.isRequired
    },
    render: function () {
        const { items, category, onItemClick } = this.props
        return (
            <div>
                <h5 style={{marginTop: '0px'}}>{category}</h5>
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