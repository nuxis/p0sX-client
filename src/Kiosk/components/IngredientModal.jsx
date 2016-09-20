import React from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { toggleIngredient, addCurrentItemToCart } from '../actions'
import { getCurrentItem } from '../selectors'

class IngredientCheckbox extends React.Component {
    static propTypes = {
        ingredient: React.PropTypes.object,
        checked: React.PropTypes.bool.isRequired,
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
        const { ingredient, checked } = this.props
        return (
            <li className='collection-item' onClick={::this.click}>
                <input
                    onClick={IngredientCheckbox.noop}
                    id={'ingredient-' + ingredient.get('id')}
                    checked={checked}
                    type='checkbox'
                    readOnly
                />
                <label htmlFor={'ingredient-' + ingredient.get('id')}>{ingredient.get('name')} {ingredient.get('price')},-</label>
            </li>
        )
    }
}

class IngredientModal extends React.Component {
    static propTypes = {
        currentItem: React.PropTypes.instanceOf(Map).isRequired,
        onClose: React.PropTypes.func.isRequired,
        onIngredientClick: React.PropTypes.func.isRequired
    }

    close () {
        const { onClose, currentItem } = this.props
        onClose(currentItem)
    }

    render () {
        const { currentItem, onIngredientClick } = this.props
        return (
            <div id='ingredient-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h4 style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        Select ingredients for {currentItem.get('item').get('name')}
                    </h4>
                    <ul className='collection'>
                        {currentItem.get('item').get('ingredients').map(ingredient =>
                            <IngredientCheckbox
                                onClick={onIngredientClick}
                                ingredient={ingredient}
                                checked={currentItem.get('ingredients').includes(ingredient)}
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
