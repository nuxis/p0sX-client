import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item.jsx'
import { connect } from 'react-redux'
import { addItemToCart, openIngredientModalForItem } from '../actions'
import { getItemsByCategory, getStrings } from '../selectors'

class ItemList extends React.Component {
    static propTypes = {
        items: PropTypes.array,
        onItemClick: PropTypes.func,
        strings: PropTypes.object
    }

    onItemClick = (id) => {
        const {onItemClick, items} = this.props
        onItemClick(items.find(i => i.id === id))
    }

    render () {
        const { items, strings } = this.props

        return (
            <div className='items'>
                {items.map((item) =>
                    <Item
                        key={item.id}
                        name={item.name}
                        price={item.price + ' ' + strings.price_text}
                        image={item.image || './images/planet.png'}
                        id={item.id}
                        onClick={this.onItemClick}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: getItemsByCategory(state),
        strings: getStrings(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onItemClick: (item) => {
            // eslint-disable-next-line camelcase
            if (item.created_in_the_kitchen && item.ingredients.length > 0) {
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
