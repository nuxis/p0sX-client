import React from 'react'
import ItemGroup from './ItemGroup.jsx'

const ItemList = React.createClass({
    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.shape({
            category: React.PropTypes.object.isRequired,
            items: React.PropTypes.array.isRequired
        }).isRequired).isRequired,
        onItemClick: React.PropTypes.func.isRequired,
        getInitialData: React.PropTypes.func.isRequired
    },
    render: function () {
        const { items, onItemClick } = this.props

        return (
            <div style={{height: '100%', marginTop: '7.25px'}} className='col s12 m6 l7'>
                <div className='item-list' style={{overflowY: 'auto', height: '100%'}}>
                    {items.map((entry) =>
                        <ItemGroup key={entry.category.id} category={entry.category.name} items={entry.items} onItemClick={onItemClick} />
                    )}
                </div>
            </div>
        )
    }
})

export default ItemList
