import {Modal, Button} from 'react-materialize';
import React, { PropTypes, Component } from 'react';

export default class IngredientModal extends Component {

    render() {
        const { onClose } = this.props;
        return (
            <div id="ingredient-modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h4>Add ingredients</h4>
                    <p>A bunch of text</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" onClick={onClose} className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
                </div>
            </div>
        )
    }
}