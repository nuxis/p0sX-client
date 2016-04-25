import React from 'react'
import classNames from 'classnames'

const CheckoutButton = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        total: React.PropTypes.number.isRequired,
        active: React.PropTypes.bool.isRequired
    },
    render: function () {
        const {onClick, total, active} = this.props
        var btnClass = classNames('btn', 'btn-large', {
            'disabled': !active,
            'waves-effect': active,
            'waves-light': active
        })

        return (
            <button style={{padding: '0 1rem 0 1rem', width: '70%'}} className={btnClass} onClick={total ? onClick : undefined}>
                Total: {total},-
            </button>
        )
    }
})

export default CheckoutButton
