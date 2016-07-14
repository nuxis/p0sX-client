import React from 'react'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { toggleIngredient, addCurrentItemToCart } from '../actions'
import { getIngredients, getCurrentItem } from '../selectors'

const IngredientModal = React.createClass({
    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        ingredients: React.PropTypes.instanceOf(List).isRequired,
        onIngredientClick: React.PropTypes.func.isRequired,
        currentItem: React.PropTypes.instanceOf(Map).isRequired
    },
    render: function () {
        const { onClose, ingredients, onIngredientClick, currentItem } = this.props
        console.log('IngredientModal: ', currentItem, ingredients)
        return (
            <div id='ingredient-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h4>Select ingredients for {currentItem.get('item').get('name')}</h4>
                    <ul className='collection'>
                        {ingredients.map((ingredient) =>
                            <li className='collection-item' key={ingredient.get('id')} onClick={(e) => onIngredientClick(e, ingredient)}>
                                <input
                                    onClick={(e) => e.stopPropagation()}
                                    id={'ingredient-' + ingredient.get('id')}
                                    checked={currentItem.get('ingredients').includes(ingredient)}
                                    type='checkbox'
                                />
                                <label htmlFor={'ingredient-' + ingredient.get('id')}>{ingredient.get('name')} {ingredient.get('price')},-</label>
                            </li>
                         )}
                    </ul>
                </div>
                <div className='modal-footer'>
                    <a href='#!' onClick={onClose} className='modal-action modal-close waves-effect waves-green btn-flat'>Add to cart</a>
                    <a href='#!' className='modal-action modal-close waves-effect waves-red btn-flat'>Cancel</a>
                </div>
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    return {
        ingredients: getIngredients(state),
        currentItem: getCurrentItem(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: () => {
            dispatch(addCurrentItemToCart())
        },
        onIngredientClick: (e, ingredient) => {
            e.stopPropagation()
            dispatch(toggleIngredient(ingredient))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientModal)
