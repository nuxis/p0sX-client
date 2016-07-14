import React from 'react'
import Item from './Item.jsx'
import { connect } from 'react-redux'
import { addItemToCart, openIngredientModalForItem } from '../actions'
import { getSelectedCategory, getItems } from '../selectors'

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
                            key={item.get('id')}
                            name={item.get('name')}
                            price={item.get('price')}
                            image={item.get('image') || require('../../images/planet.png')}
                            // eslint-disable-next-line camelcase
                            onClick={() => onItemClick(item.get('id'), item.get('can_have_ingredients'))}
                        />
                    )}
                </div>
            </div>
        )
    }
})

const getVisibleItems = (items, category) => {
    if (category === 0) {
        return items
    } else {
        return items.filter((i) => i.category === category)
    }
}

const mapStateToProps = (state) => {
    return {
        items: getVisibleItems(getItems(state), getSelectedCategory(state))
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // eslint-disable-next-line camelcase
        onItemClick: (item, can_have_ingredients) => {
            // eslint-disable-next-line camelcase
            if (can_have_ingredients) {
                $('#ingredient-modal').openModal()
                dispatch(openIngredientModalForItem(item))
            } else {
                dispatch(addItemToCart(item))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList)
