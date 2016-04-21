import React from 'react'
import classNames from 'classnames'

const CheckoutButton = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        total: React.PropTypes.number.isRequired
    },
    render: function () {
        const {onClick, total} = this.props
        var btnClass = classNames('btn', 'btn-large', 'green', {
            'disabled': total === 0,
            'waves-effect': total > 0,
            'waves-light': total > 0
        })

        return (
            <button style={{padding: '0 1rem 0 1rem', width: '70%'}} className={btnClass} onClick={total ? onClick : undefined}>
                Total: {total},-
            </button>
        )
    }
})

export default CheckoutButton
