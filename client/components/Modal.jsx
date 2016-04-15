import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {getItemById} from '../reducers';

class Modal extends Component {
    render() {
        const { onClose, id, item, ingredients } = this.props;
        return (
            <div id={id} className="modal modal-fixed-footer">
                <form id="ingredient-form" action="#">
                    <div className="modal-content">
                        <h4>Add ingredients to {item.name}</h4>
                        <ul>
                            {ingredients.map(ingredient =>
                                <li key={ingredient.id}>
                                    <input value="true" type="checkbox" name={ingredient.id} id={"ingredient-" + ingredient.id} />
                                    <label htmlFor={"ingredient-" + ingredient.id}>{ingredient.name}</label>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button href="#!" type="submit" onClick={onClose} className="modal-action modal-close waves-effect waves-green btn-flat">Done</button>
                    </div>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        item: getItemById(state, state.currentItem)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: (e) => {
            var data = $('#ingredient-form').serialize();
            console.log(data);



            e.preventDefault();
            console.log("Closed");
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal);