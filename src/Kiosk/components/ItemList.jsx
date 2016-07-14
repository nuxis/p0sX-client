import React from 'react'
import Item from './Item.jsx'
import { connect } from 'react-redux'
import { addItemToCart, openIngredientModalForItem } from '../actions'
import { getSelectedCategory, getItems } from '../selectors'
import { List } from 'immutable'

const ItemList = React.createClass({
    propTypes: {
        items: React.PropTypes.instanceOf(List).isRequired,
        onItemClick: React.PropTypes.func.isRequired
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
