import React from 'react'
import Item from './Item.jsx'
import { connect } from 'react-redux'
import { addItemToCart, openIngredientModalForItem } from '../actions'
import { getItemsByCategory } from '../selectors'
import { List } from 'immutable'

class ItemList extends React.Component {
    static propTypes = {
        items: React.PropTypes.instanceOf(List).isRequired,
        onItemClick: React.PropTypes.func.isRequired
    }

    render () {
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
                            item={item}
                            onClick={onItemClick}
                        />
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: getItemsByCategory(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onItemClick: (item) => {
            // eslint-disable-next-line camelcase
            if (item.get('created_in_the_kitchen')) {
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
