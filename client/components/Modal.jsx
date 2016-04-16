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
                    <h4>Select ingredients for {item.name}</h4>
                    <ul>
                    {ingredients.map(ingredient =>
                        <li key={ingredient.id} style={{fontSize: "20px"}} >
                            <input onChange={() => onIngredientClick(ingredient.id)}
                                   id={"ingredient-" + ingredient.id}
                                   checked={currentItem.ingredients.indexOf(ingredient.id) !== -1}
                                   type="checkbox"
                            />
                            <label htmlFor={"ingredient-" + ingredient.id}>{ingredient.name}</label>
                        </li>
                    )}
                    </ul>
                </div>
                <div className="modal-footer">
                    <a href="#!" onClick={onClose} className="modal-action modal-close waves-effect waves-green btn-flat">Add to cart</a>
                    <a href="#!" className="modal-action modal-close waves-effect waves-red btn-flat">Cancel</a>
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