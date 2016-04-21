import React from 'react'
import classNames from 'classnames'

const CheckoutButton = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        entries: React.PropTypes.number.isRequired
    },
    render: function () {
        const {onClick, entries} = this.props
        var btnClass = classNames('btn', 'btn-large', 'red', 'right', {
            'disabled': entries === 0,
            'waves-effect': entries > 0,
            'waves-light': entries > 0
        })

        return (
            <button style={{padding: '0 1rem 0 1rem', width: '25%'}} className={btnClass} onClick={onClick} title='Empty cart'>
                <i className='material-icons'>delete</i>
            </button>
        )
    }
})

export default CheckoutButton
