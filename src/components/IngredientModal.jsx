import React from 'react'
import { connect } from 'react-redux'
import {getItemById} from '../reducers'
import {toggleIngredient, addCurrentItemToCart} from '../actions'

const IngredientModal = React.createClass({
    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        item: React.PropTypes.object.isRequired,
        ingredients: React.PropTypes.array.isRequired,
        onIngredientClick: React.PropTypes.func.isRequired,
        currentItem: React.PropTypes.object.isRequired
    },
    render: function () {
        const { onClose, item, ingredients, onIngredientClick, currentItem } = this.props
        return (
            <div id='ingredient-modal' className='modal modal-fixed-footer'>
                <div className='modal-content'>
                    <h4>Select ingredients for {item.name}</h4>
                    <ul className='collection'>
                    {ingredients.map((ingredient) =>
                        <li className='collection-item' key={ingredient.id} onClick={() => onIngredientClick(ingredient.id)} >
                            <input onClick={() => onIngredientClick(ingredient.id)}
                                   id={'ingredient-' + ingredient.id}
                                   checked={currentItem.ingredients.indexOf(ingredient.id) !== -1}
                                   type='checkbox'
                            />
                            <label htmlFor={'ingredient-' + ingredient.id}>{ingredient.name} {ingredient.price},-</label>
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
        ingredients: state.ingredients,
        currentItem: state.currentItem,
        item: getItemById(state, state.currentItem.id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: () => {
            dispatch(addCurrentItemToCart())
        },
        onIngredientClick: (id) => {
            dispatch(toggleIngredient(id))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IngredientModal)
