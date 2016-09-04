import React from 'react'
import { connect } from 'react-redux'
import { List, Map } from 'immutable'
import { toggleIngredient, addCurrentItemToCart } from '../actions'
import { getIngredients, getCurrentItem } from '../selectors'

class IngredientCheckbox extends React.Component {
    static propTypes = {
        ingredient: React.PropTypes.object.isRequired,
        currentItem: React.PropTypes.object.isRequired,
        onClick: React.PropTypes.func.isRequired
    }

    static noop (e) {
        e.stopPropagation()
    }

    click (e) {
        const { onClick, ingredient } = this.props
        e.stopPropagation()
        onClick(ingredient)
    }

    render () {
        const { ingredient, currentItem } = this.props
        return (
            <li className='collection-item' onClick={::this.click}>
                <input
                    onClick={IngredientCheckbox.noop}
                    id={'ingredient-' + ingredient.get('id')}
                    checked={currentItem.get('ingredients').includes(ingredient)}
                    type='checkbox'
                />
                <label htmlFor={'ingredient-' + ingredient.get('id')}>{ingredient.get('name')} {ingredient.get('price')},-</label>
            </li>
        )
    }
}

class IngredientModal extends React.Component {
    static propTypes = {
        ingredients: React.PropTypes.instanceOf(List).isRequired,
        currentItem: React.PropTypes.instanceOf(Map).isRequired,
        onClose: React.PropTypes.func.isRequired,
        onIngredientClick: React.PropTypes.func.isRequired
    }

    close () {
        const { onClose, currentItem } = this.props
        onClose(currentItem)
    }

    render () {
        const { ingredients, currentItem, onIngredientClick } = this.props
        return (
            <div id='ingredient-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h4>Select ingredients for {currentItem.get('item').get('name')}</h4>
                    <ul className='collection'>
                        {ingredients.map((ingredient) =>
                            <IngredientCheckbox
                                onClick={onIngredientClick}
                                ingredient={ingredient}
                                currentItem={currentItem}
                                key={ingredient.get('id')}
                            />
                        )}
                    </ul>
                </div>
                <div className='modal-footer'>
                    <a href='#!' onClick={::this.close} className='modal-action modal-close waves-effect waves-green btn-flat'>Add to cart</a>
                    <a href='#!' className='modal-action modal-close waves-effect waves-red btn-flat'>Cancel</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: getIngredients(state),
        currentItem: getCurrentItem(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: (currentItem) => {
            dispatch(addCurrentItemToCart(currentItem))
        },
        onIngredientClick: (ingredient) => {
            dispatch(toggleIngredient(ingredient))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientModal)
