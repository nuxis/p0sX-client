import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {getItemById} from '../reducers';
import {toggleIngredient, addCurrentItemToCart} from '../actions'

class Modal extends Component {
    render() {
        const { onClose, id, item, ingredients, onIngredientClick, currentItem } = this.props;
        return (
            <div id={id} className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h4>Add ingredients to {item.name}</h4>
                    <ul>
                        {ingredients.map(ingredient =>
                            <li key={ingredient.id}>
                                <input onChange={() => onIngredientClick(ingredient.id)}
                                       id={"ingredient-" + ingredient.id}
                                       checked={currentItem.ingredients.indexOf(ingredient.id) !== -1}
                                       type="checkbox"/>
                                <label htmlFor={"ingredient-" + ingredient.id}>{ingredient.name}</label>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="modal-footer">
                    <button href="#!" type="submit" onClick={onClose} className="modal-action modal-close waves-effect waves-green btn-flat">Done</button>
                </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        currentItem: state.currentItem,
        item: getItemById(state, state.currentItem.id)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: () => {
            dispatch(addCurrentItemToCart());
        },
        onIngredientClick: (id) => {
            dispatch(toggleIngredient(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal);