import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class Modal extends Component {
    render() {
        const { onClose, id, item, ingredients } = this.props;
        return (
            <div id={id} className="modal modal-fixed-footer">
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

export default Modal;