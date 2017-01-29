import React from 'react'
import Item from './Item.jsx'
import { connect } from 'react-redux'
import { addItemToCart, openIngredientModalForItem, toggleIngredientModal } from '../actions'
import { getItemsByCategory } from '../selectors'
import { List } from 'immutable'

class ItemList extends React.Component {
    static propTypes = {
        items: React.PropTypes.instanceOf(List),
        onItemClick: React.PropTypes.func
    }

    onItemClick = (id) => {
        const {onItemClick, items} = this.props
        onItemClick(items.find(i => i.get('id') === id))
    }

    render () {
        const { items } = this.props

        return (
            <div style={{height: '100%', paddingTop: '8px'}} className='col col-xs-7 col-sm-7 col-md-7 col-lg-7'>
                <div className='item-list' style={{overflowY: 'auto', height: 'calc(100% - 5px)', paddingLeft: '10px'}}>
                    {items.map((item) =>
                        <Item
                            key={item.get('id')}
                            name={item.get('name')}
                            price={item.get('price')}
                            image={item.get('image') || require('../../images/planet.png')}
                            id={item.get('id')}
                            onClick={this.onItemClick}
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
