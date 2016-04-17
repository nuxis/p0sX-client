import React, { PropTypes, Component } from 'react'
import classNames from 'classnames';

class CheckoutButton extends Component {
    render() {
        const {onClick, total} = this.props;
        var btnClass = classNames('btn', 'btn-large', 'green', {
            'disabled': total == 0,
            'waves-effect': total > 0,
            'waves-light': total > 0
        });

        return(
            <button className={btnClass} onClick={total?onClick:undefined}>
                Total: {total},-
            </button>
        )
    }
}

CheckoutButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired
};

export default CheckoutButton;