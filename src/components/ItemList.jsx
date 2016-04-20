import React from 'react'
import Item from './Item.jsx'

const ItemList = React.createClass({
    componentDidMount: function () {
        this.props.getInitialData()
    },
    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            name: React.PropTypes.string.isRequired,
            barcode: React.PropTypes.string.isRequired,
            stock: React.PropTypes.number.isRequired,
            category: React.PropTypes.number.isRequired,
            can_have_ingredients: React.PropTypes.bool.isRequired,
            price: React.PropTypes.number.isRequired
        }).isRequired).isRequired,
        onItemClick: React.PropTypes.func.isRequired,
        getInitialData: React.PropTypes.func.isRequired
    },
    render: function () {
        const { items, onItemClick } = this.props

        return (
            <div style={{height: 'calc(100% - 30px)'}} className='col s12 m6 l7'>
                <h4>Items</h4>
                <div className='item-list' style={{overflowY: 'auto', height: 'calc(100% - 10px)'}}>
                    {items.map((item) =>
                        <Item
                            key={item.id}
                            {...item}
                            onClick={() => onItemClick(item.id, item.can_have_ingredients)}
                        />
                    )}
                </div>
            </div>
        )
    }
})

export default ItemList
