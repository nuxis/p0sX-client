import React from 'react'
import Item from './Item.jsx'

const ItemList = React.createClass({
    propTypes: {
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
        onItemClick: React.PropTypes.func.isRequired,
        getInitialData: React.PropTypes.func.isRequired
    },
    render: function () {
        const { items, onItemClick } = this.props

        return (
            <div style={{height: '100%', marginTop: '7.25px'}} className='col s12 m6 l7'>
                <div className='item-list' style={{overflowY: 'auto', height: '100%'}}>
                    {items.map((item) =>
                        <Item
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            image={item.image || require('../images/planet.png')}
                            // eslint-disable-next-line camelcase
                            onClick={() => onItemClick(item.id, item.can_have_ingredients)}
                        />
                    )}
                </div>
            </div>
        )
    }
})

export default ItemList
