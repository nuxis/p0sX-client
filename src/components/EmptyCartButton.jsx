import React from 'react'
import classNames from 'classnames'

const CheckoutButton = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        active: React.PropTypes.bool.isRequired
    },
    render: function () {
        const {onClick, active} = this.props
        var btnClass = classNames('btn', 'btn-large', 'red', 'right', {
            'disabled': !active,
            'waves-effect': active,
            'waves-light': active
        })

        return (
            <button style={{padding: '0 1rem 0 1rem', width: '25%'}} className={btnClass} onClick={onClick} title='Empty cart'>
                <i className='material-icons'>delete</i>
            </button>
        )
    }
})

export default CheckoutButton
